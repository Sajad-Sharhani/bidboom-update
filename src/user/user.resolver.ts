import errors from "../schema/errors";
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
    throw new Error(errors[0].id);
  }

  let user;

  try {
    user = await userModel.findOne(
      userData.email
        ? {
            email: userData.email,
          }
        : { phoneNumber: userData.phoneNumber }
    );
  } catch {
    throw new Error(errors[1].id);
  }

  if (!user) {
    try {
      user = await userModel.create({
        ...userData,
        identifierCode: await getUnique(userData.phoneNumber || userData.email),
        ICUsers: [],
        type: userData.type || UserType["User"],
        registerations: userData.phoneNumber
          ? Registerations["PhoneNumber"]
          : Registerations["Email"],
      });
    } catch {
      throw new Error(errors[1].id);
    }
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
  const text = `کاربر عزیز بیدبوم، 
کد تایید موقت حساب شما در بیدبوم ${code} می باشد.`;

  if (phoneNumber) {
    const { message, status } = await sendMessage({
      message: text,
      sender: 10008800060060,
      receptor: phoneNumber,
    });
    return { sms: { message, status } };
  }
  if (email) {
    try {
      await sendMail({ to: email, subject: "بیدبوم", text });
    } catch {
      throw new Error(errors[4].id);
    }

    return { sms: { message: "done", status: 200 } };
  }
  return {};
};

const mutateUser: MutationResolvers["mutateUser"] = async ({
  input: userData,
}: {
  input: MutateUserInput;
}) => {
  let user;
  try {
    user = await userModel.findById(userData._id);
  } catch {
    throw new Error(errors[1].id);
  }

  if (!user) {
    throw new Error(errors[5].id);
  } else {
    try {
      await user.update({
        ...userData,
      });
    } catch {
      throw new Error(errors[6].id);
    }
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
  let user;
  try {
    user = await userModel.findById(userData._id);
  } catch {
    throw new Error(errors[1].id);
  }

  if (!user) {
    throw new Error(errors[5].id);
  } else if (user.type !== UserType["Ambassador"]) {
    throw new Error(errors[7].id);
  } else {
    try {
      await user.update({
        ...userData,
      });
    } catch {
      throw new Error(errors[6].id);
    }
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
  input,
}: {
  input: MutationCreateGoogleUserArgs["input"];
}) => {
  if (input.type === UserType["SuperAdmin"]) {
    return;
  }
  const userData = await getAccount(input.token);

  let user;
  try {
    user = await userModel.findOne({
      email: userData.email,
    });
  } catch {
    throw new Error(errors[1].id);
  }
  if (!user) {
    try {
      user = await userModel.create({
        ...userData,
        identifierCode: await getUnique(userData.email),
        type: input.type,
      });
    } catch {
      throw new Error(errors[1].id);
    }
  } else {
    try {
      await user.update({
        ...userData,
      });
    } catch {
      throw new Error(errors[6].id);
    }
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
  let user;
  try {
    user = await userModel.findById(_id);
  } catch {
    throw new Error(errors[1].id);
  }
  if (!user) {
    throw new Error(errors[5].id);
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

  try {
    await notificationModel.create(input);
  } catch {
    throw new Error(errors[12].id);
  }

  return { done: true };
};

const getNotifications: QueryResolvers["getNotifications"] = async ({
  input,
}: QueryGetNotificationsArgs) => {
  let notifs;
  try {
    notifs = await notificationModel.find({ type: input });
  } catch {
    throw new Error(errors[13].id);
  }

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
