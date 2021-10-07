import {
  GetChallengeType,
  MutationCreateChallengeArgs,
  MutationResolvers,
  MutationSendAnswerArgs,
  QueryResolvers,
  IsAnswerRight,
  GetChallengersSuperAdmin,
} from "../schema/challenge";
import errors from "../schema/errors";
import { UserType } from "../schema/user";
import { authenticate, multiAuthenticate } from "../utils/index";
import challengeModel, { challengerModel } from "./challenge.model";

const createChallenge = async (
  { input }: MutationCreateChallengeArgs,

  { _id }: { _id: string | null }
): Promise<GetChallengeType> => {
  await authenticate(_id, UserType["SuperAdmin"]);
  try {
    await challengeModel.deleteMany();
  } catch {
    throw new Error(errors[20].id);
  }

  let challenge;
  try {
    challenge = await challengeModel.create({
      ...input,
      winnersNumber: 0,
      loosersNumber: 0,
    });
  } catch {
    throw new Error(errors[21].id);
  }

  return challenge.toObject();
};

const getChallenge = async (
  _: any,
  { _id }: { _id: string | null }
): Promise<GetChallengeType> => {
  let challenge;
  try {
    challenge = await challengeModel.findOne();
  } catch {
    throw new Error(errors[22].id);
  }

  return challenge.toObject();
};

const sendAnswer = async (
  { input }: MutationSendAnswerArgs,
  { _id }: { _id: string | null }
): Promise<IsAnswerRight> => {
  await multiAuthenticate(_id);

  if (await challengerModel.findOne({ challenger: _id }))
    throw new Error(errors[23].id);

  let challenge;
  try {
    challenge = await challengeModel.findOne();
  } catch {
    throw new Error(errors[21].id);
  }

  let correct = false;
  if (input === challenge.correct) {
    correct = true;
    await challenge.updateOne({ winnersNumber: challenge.winnersNumber + 1 });
  } else {
    await challenge.updateOne({ loosersNumber: challenge.loosersNumber + 1 });
  }
  await challengerModel.create({ answer: input, challenger: _id, correct });

  return { correct };
};

const getChallengersSuperAdmin = async (
  _: any,
  { _id }: { _id: string | null }
): Promise<GetChallengersSuperAdmin> => {
  await authenticate(_id, UserType["SuperAdmin"]);

  return {
    winners: await challengerModel.find({ correct: true }),
    loosers: await challengerModel.find({ correct: false }),
  };
};
export const resolvers: MutationResolvers | QueryResolvers = {
  createChallenge: createChallenge as any,
  getChallenge: getChallenge as any,
  sendAnswer: sendAnswer as any,
  getChallengersSuperAdmin: getChallengersSuperAdmin as any,
};
