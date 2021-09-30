import errors from "../schema/errors";
import {
  MutationResolvers,
  MutationCreatePathArgs,
  CreatePathResponse,
  QueryResolvers,
  MutationMutatePathArgs,
  MutationDeletePathArgs,
  QueryGetPathArgs,
  PathType,
  QueryGetPathsArgs,
} from "../schema/path";
import cities from "../statics/city";
import countries from "../statics/country";
import provinces from "../statics/province";
import { authenticate } from "../utils/index";
import pathModel from "./path.model";

const createPath = async (
  { input }: MutationCreatePathArgs,
  { _id }: { _id: string | null }
): Promise<CreatePathResponse> => {
  await authenticate(_id);
  let path;
  try {
    path = await pathModel.create({ ...input, maker: _id });
  } catch {
    throw new Error(errors[14].id);
  }

  return { _id: path._id };
};

const mutatePath = async (
  { input: { _id: pathId, ...data } }: MutationMutatePathArgs,
  { _id }: { _id: string | null }
) => {
  await authenticate(_id);

  try {
    await pathModel.updateOne({ _id: pathId }, data);
  } catch {
    throw new Error(errors[15].id);
  }

  return { _id: pathId };
};

const deletePath = async (
  { input }: MutationDeletePathArgs,
  { _id }: { _id: string | null }
) => {
  await authenticate(_id);

  try {
    await pathModel.deleteOne({ _id: input });
  } catch {
    throw new Error(errors[16].id);
  }

  return { done: true };
};

const getPath = async ({ input }: QueryGetPathArgs): Promise<PathType> => {
  let path;
  try {
    path = (await pathModel.findById(input)).toObject();
  } catch {
    throw new Error(errors[17].id);
  }

  return path;
};

const getPaths = async ({ input }: QueryGetPathsArgs) => {
  let paths;
  try {
    paths = await pathModel.find({ maker: input });
  } catch {
    throw new Error(errors[17].id);
  }

  return paths;
};

export const resolvers: MutationResolvers | QueryResolvers = {
  createPath: createPath as any,
  mutatePath: mutatePath as any,
  deletePath: deletePath as any,
  getPath,
  getPaths,
  getCity: () => cities as any,
  getProvince: () => provinces as any,
  getCountry: () => countries as any,
};
