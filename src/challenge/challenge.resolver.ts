import {
  GetChallengeType,
  MutationCreateChallengeArgs,
  MutationResolvers,
  MutationSendAnswerArgs,
  QueryResolvers,
  IsAnswerRight,
  GetChallengersSuperAdmin,
  GetChallengersSuperAdminInput,
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

  const challenges = await challengeModel.find({ isActive: true });
  if (challenges.length > 1) {
    throw new Error(errors[24].id);
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
    challenge = await challengeModel.findOne({ isActive: true });
    if (!challenge) {
      throw new Error();
    }
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

  let challenge;
  try {
    challenge = await challengeModel.findOne({ isActive: true });
  } catch {
    throw new Error(errors[22].id);
  }

  if (
    await challengerModel.findOne({ challenger: _id, challenge: challenge._id })
  )
    throw new Error(errors[23].id);

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
  { input }: { input: GetChallengersSuperAdminInput },
  { _id }: { _id: string | null }
): Promise<GetChallengersSuperAdmin> => {
  await authenticate(_id, UserType["SuperAdmin"]);

  const skips = input.pageSize * input.pageNum;

  return {
    winners: await challengerModel.find(
      { correct: true, challenge: input.challenge },
      null,
      { skip: skips, limit: input.pageSize }
    ),
    loosers: await challengerModel.find(
      { correct: false, challenge: input.challenge },
      null,
      { skip: skips, limit: input.pageSize }
    ),
  };
};
const disableChallenge = async (
  { input }: { input: string },
  { _id }: { _id: string | null }
): Promise<GetChallengeType> => {
  await authenticate(_id, UserType["SuperAdmin"]);

  let challenge;
  try {
    challenge = await challengeModel.findById(input);
  } catch {
    throw new Error(errors[22].id);
  }
  await challenge.updateOne({ isActive: false });

  return challenge.toObject();
};

const deleteChallenge = async (
  { input }: { input: string },
  { _id }: { _id: string | null }
): Promise<GetChallengeType> => {
  await authenticate(_id, UserType["SuperAdmin"]);

  let challenge;
  try {
    challenge = await challengeModel.findById(input);
  } catch {
    throw new Error(errors[22].id);
  }
  await challenge.deleteOne();

  return challenge.toObject();
};

const getChallengesSuperAdmin = async (
  _: any,
  { _id }: { _id: string | null }
): Promise<GetChallengeType[]> => {
  await authenticate(_id, UserType["SuperAdmin"]);

  return await challengeModel.find();
};

export const resolvers: MutationResolvers | QueryResolvers = {
  createChallenge: createChallenge as any,
  getChallenge: getChallenge as any,
  sendAnswer: sendAnswer as any,
  getChallengersSuperAdmin: getChallengersSuperAdmin as any,
  disableChallenge: disableChallenge as any,
  deleteChallenge: deleteChallenge as any,
  getChallengesSuperAdmin: getChallengesSuperAdmin as any,
};
