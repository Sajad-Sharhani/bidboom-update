import {
  GetChallengeType,
  MutationCreateChallengeArgs,
  MutationResolvers,
  MutationSendAnswerArgs,
  QueryResolvers,
  IsAnswerRight,
  GetChallengersSuperAdmin,
  GetChallengersSuperAdminInput,
  SendAnswerInput,
  GetChallenge,
} from "../schema/challenge";
import errors from "../schema/errors";
import { UserType } from "../schema/user";
import { authenticate, multiAuthenticate } from "../utils/index";
import challengeModel, { challengerModel } from "./challenge.model";
import { AnyARecord } from "dns";

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
      isActive: true,
    });
  } catch {
    throw new Error(errors[21].id);
  }

  return challenge.toObject();
};

const getChallenge = async (
  _: any,
  { _id }: { _id: string | null }
): Promise<GetChallenge> => {
  let challenge;
  let challenger;
  try {
    challenge = await challengeModel.findOne({ isActive: true });
    if (!challenge) {
      throw new Error();
    }
    challenger = await challengerModel.findOne({
      challenge: challenge._id,
      challenger: _id,
    });
  } catch {
    throw new Error(errors[22].id);
  }

  return {
    subject: challenge?.subject,
    description: challenge?.description,
    answers: challenge?.answers,
    sponsors: challenge?.sponsors,
    isActive: challenge?.isActive,
    media: challenge?.media,
    winnersNumber: challenge?.winnersNumber,
    loosersNumber: challenge?.loosersNumber,
    answer: challenger?.answer,
  };
};

const sendAnswer = async (
  { input }: { input: SendAnswerInput },
  { _id }: { _id: string | null }
): Promise<IsAnswerRight> => {
  await authenticate(_id, UserType["SuperAdmin"]);

  let challenge;
  try {
    challenge = await challengeModel.findOne({
      isActive: true,
      _id: input.challenge,
    });
    console.log(challenge);
  } catch {
    throw new Error(errors[22].id);
  }

  if (
    await challengerModel.findOne({ challenger: _id, challenge: challenge._id })
  )
    throw new Error(errors[23].id);

  let correct = false;
  if (input.answer === challenge.correct) {
    correct = true;
    await challenge.updateOne({ winnersNumber: challenge.winnersNumber + 1 });
  } else {
    await challenge.updateOne({ loosersNumber: challenge.loosersNumber + 1 });
  }
  await challengerModel.create({
    answer: input.answer,
    challenger: _id,
    correct,
    challenge: challenge._id,
  });

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
