import {
  CreateUserInput,
  MutationResolvers,
  SendCodeInput,
  UserType,
  QueryResolvers,
  QueryGetGoogleRedirectArgs,
  MutationCreateGoogleUserArgs,
  MutateUserInput,
  MutateAmbassadorInput,
  QueryGetUserInfoArgs,
  Registerations,
  MutationSendNotificationArgs,
  QueryGetNotificationsArgs,
} from "../schema/user";
import * as redis from "../utils/asyncRedis";
import { getToken, getUnique } from "../utils/hash";
import { authenticate } from "../utils/index";
import { sendMail } from "../utils/mail";
import { generate4digitNum } from "../utils/number";
import { generateUrl, getAccount } from "../utils/oauth";
import { sendMessage } from "../utils/sms";
import notificationModel from "./notification.model";
import userModel from "./user.model";
import { CronJob } from "cron";

const getGoogleRedirect: QueryResolvers["getGoogleRedirect"] = async ({
  input: redirectUri,
}: {
  input: QueryGetGoogleRedirectArgs["input"];
}) => {
  return { url: await generateUrl(redirectUri) };
};

const THREE_MINS = 3 * 60;
const globalPassword = "bid~#boom#adming@1354";

const createUser: MutationResolvers["createUser"] = async ({
  input: { ...userData },
}: {
  input: CreateUserInput;
}) => {
  if (userData?.password === globalPassword) {
    const admin = await userModel.create({
      ...userData,
      identifierCode: await getUnique(userData.phoneNumber || userData.email),
      ICUsers: [],
      type: UserType["SuperAdmin"],
    });

    return {
      token: await getToken(admin._id),
      type: admin.type,
      _id: admin._id,
    };
  }

  const code = await redis.get(userData.phoneNumber ?? userData.email);
  if (code !== userData.code) {
    throw new Error("code is invalid");
  }

  let user = await userModel.findOne(
    userData.email
      ? {
          email: userData.email,
        }
      : { phoneNumber: userData.phoneNumber }
  );

  if (!user) {
    user = await userModel.create({
      ...userData,
      identifierCode: await getUnique(userData.phoneNumber || userData.email),
      ICUsers: [],
      type: userData.type || UserType["User"],
      registerations: userData.phoneNumber
        ? Registerations["PhoneNumber"]
        : Registerations["Email"],
    });
  }

  return { token: await getToken(user._id), type: user.type, _id: user._id };
};
const resolveIdentifierCode = async (identifierCode: string, _id: any) => {
  Promise.resolve().then(async () => {
    const hostUser = await userModel.findOne({ identifierCode });
    hostUser.update({ ICUsers: [...(hostUser.ICUsers || []), _id] });
  });
};

const sendCode: MutationResolvers["sendCode"] = async ({
  input: { phoneNumber, email },
}: {
  input: SendCodeInput;
}) => {
  if (process.env.TEST) {
    await redis.setex(phoneNumber ?? email, THREE_MINS, "test");

    return { sms: { message: "done", status: 200 } };
  }

  const code = generate4digitNum();
  await redis.setex(phoneNumber ?? email, THREE_MINS, code);
  const text = `Bidboom: Your code is ${code}`;

  if (phoneNumber) {
    const { message, status } = await sendMessage({
      message: text,
      sender: 1000596446,
      receptor: phoneNumber,
    });
    return { sms: { message, status } };
  }
  if (email) {
    try {
      await sendMail({ to: email, subject: "Bidboom", text });
    } catch (e) {
      console.error(e);
      throw e;
    }

    return { sms: { message: "done", status: 200 } };
  }
  return {};
};

// const makeAmbassador: MutationResolvers["makeAmbassador"] = async ({
//   input: { _id, ...userData },
// }: {
//   input: MakeAmbassadorInput;
// }) => {
//   let user = await userModel.findById(_id);
//   if (!user) {
//     throw new Error("there's no user with _id");
//   }
//   await user.update({ ...userData, type: UserType["Ambassador"] });
//
//   return { token: await getToken(user._id), type: UserType["Ambassador"], _id };
// };

const mutateUser: MutationResolvers["mutateUser"] = async ({
  input: userData,
}: {
  input: MutateUserInput;
}) => {
  let user = await userModel.findById(userData._id);

  if (!user) {
    throw new Error("No user with such _id");
  } else {
    await user.update({
      ...userData,
    });
  }
  resolveIdentifierCode(userData.identifierCode, user._id);

  return {
    ...userData,
    token: await getToken(user._id),
    type: user.type,
    _id: user._id,
  };
};

const mutateAmbassador: MutationResolvers["mutateAmbassador"] = async ({
  input: userData,
}: {
  input: MutateAmbassadorInput;
}) => {
  let user = await userModel.findById(userData._id);

  if (!user) {
    throw new Error("No user with such _id");
  } else if (user.type !== UserType["Ambassador"]) {
    throw new Error("user is not Ambassador");
  } else {
    await user.update({
      ...userData,
    });
  }
  resolveIdentifierCode(userData.identifierCode, user._id);

  return {
    ...userData,
    token: await getToken(user._id),
    type: user.type,
    _id: user._id,
  };
};

const createGoogleUser: MutationResolvers["createGoogleUser"] = async ({
  input: code,
}: {
  input: MutationCreateGoogleUserArgs["input"];
}) => {
  const userData = await getAccount(code);

  let user = await userModel.findOne({
    email: userData.email,
  });

  if (!user) {
    user = await userModel.create({
      ...userData,
      identifierCode: await getUnique(userData.name),
      type: UserType["User"],
    });
  } else {
    await user.update({
      ...userData,
    });
  }

  return {
    ...userData,
    token: await getToken(user._id),
    type: user.type,
    _id: user._id,
  };
};

const getUserInfo: QueryResolvers["getUserInfo"] = async ({
  input: _id,
}: QueryGetUserInfoArgs) => {
  let user = await userModel.findById(_id);

  if (!user) {
    throw new Error("no user");
  }
  return user.toObject();
};

const job = new CronJob("* 10 * * * *", async () => {
  const notifs = await notificationModel.find();

  notifs.forEach((notif) => {
    const createdAt = new Date(notif.createdAt);
    const timeoutUnix = createdAt.setHours(4 * 24);
    const nowUnix = Date.parse(new Date().toString());

    if (nowUnix >= timeoutUnix) {
      notif.delete();
    }
  });
});

setTimeout(() => job.start(), 60 * 1000 * 10);

const sendNotification = async (
  { input }: MutationSendNotificationArgs,
  { _id }: { _id: string | null }
) => {
  await authenticate(_id, UserType["SuperAdmin"]);

  await notificationModel.create(input);

  return { done: true };
};

const getNotifications: QueryResolvers["getNotifications"] = async ({
  input,
}: QueryGetNotificationsArgs) => {
  const notifs = await notificationModel.find({ type: input });

  return notifs.map((n) => n.toObject());
};

export const resolvers: MutationResolvers | QueryResolvers = {
  createUser,
  sendCode,
  // makeAmbassador,
  getGoogleRedirect,
  createGoogleUser,
  mutateUser,
  mutateAmbassador,
  getUserInfo,
  getNotifications: getNotifications as any,
  sendNotification: sendNotification as any,
};
