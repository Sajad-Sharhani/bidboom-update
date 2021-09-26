import { authenticate } from "../utils/index";
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
import pathModel from "./path.model";

const createPath = async (
  { input }: MutationCreatePathArgs,
  { _id }: { _id: string | null }
): Promise<CreatePathResponse> => {
  await authenticate(_id);
  const path = await pathModel.create({ ...input, maker: _id });

  return { _id: path._id };
};

const mutatePath = async (
  { input: { _id: pathId, ...data } }: MutationMutatePathArgs,
  { _id }: { _id: string | null }
) => {
  await authenticate(_id);

  // const path = await pathModel.findById(pathId)

  await pathModel.updateOne({ _id: pathId }, data);
  // path.update(data)

  return { _id: pathId };
};

const deletePath = async (
  { input }: MutationDeletePathArgs,
  { _id }: { _id: string | null }
) => {
  await authenticate(_id);

  await pathModel.deleteOne({ _id: input });

  return { done: true };
};

const getPath = async ({ input }: QueryGetPathArgs): Promise<PathType> => {
  const path = (await pathModel.findById(input)).toObject();

  return path;
};

const getPaths = async ({ input }: QueryGetPathsArgs) => {
  const paths = await pathModel.find({ maker: input });

  return paths;
};

export const resolvers: MutationResolvers | QueryResolvers = {
  createPath: createPath as any,
  mutatePath: mutatePath as any,
  deletePath: deletePath as any,
  getPath,
  getPaths,
};
