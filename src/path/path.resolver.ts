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
  MutationLikePathArgs,
  MutationCommentPathArgs,
  MutationArchivePathArgs,
  CommentPathResponse,
  RemoveCommentPath,
  QuerySearchPathArgs,
} from "../schema/path";
import { UserType } from "../schema/user";
import cities from "../statics/city";
import countries from "../statics/country";
import provinces from "../statics/province";
import { getUnique } from "../utils/hash";
import { authenticate } from "../utils/index";
import pathModel from "./path.model";

const defaultPath: PathType = { views: 0, likesNumber: 0 } as PathType;

const createPath = async (
  { input }: MutationCreatePathArgs,
  { _id }: { _id: string | null }
): Promise<CreatePathResponse> => {
  await authenticate(_id);
  let path;
  try {
    path = await pathModel.create({
      ...input,
      maker: _id,
      views: [],
      likes: [],
      comments: [],
    });
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

const getPath = async (
  { input }: QueryGetPathArgs,
  { _id }: { _id: string | null }
): Promise<PathType> => {
  let user;
  let liked = false,
    archived = false;
  try {
    user = await authenticate(_id);
    archived = user.archives.includes(_id) || false;
  } catch {}
  let path;
  try {
    path = await pathModel.findById(input);
    await path.updateOne({ views: [...new Set([...path.views, _id])] });
  } catch {
    throw new Error(errors[17].id);
  }

  try {
    liked = path.likes.includes(user._id) || false;
  } catch {}

  return {
    ...defaultPath,
    ...path.toObject(),
    views: path.views.length,
    archived,
    liked,
    commentsNumber: path.comments.length,
    likesNumber: path.likes.length,
  };
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

const likePath = async (
  { input }: MutationLikePathArgs,
  { _id }: { _id: string | null }
): Promise<PathType> => {
  let user;
  try {
    user = await authenticate(_id);
  } catch {
    try {
      user = await authenticate(_id, UserType["User"]);
    } catch {
      throw new Error(errors[19].id);
    }
  }

  let path;
  try {
    path = await pathModel.findById(input);
    await path.updateOne({ likes: [...new Set([...path.likes, _id])] });
  } catch {
    throw new Error(errors[17].id);
  }
  const archived = user.archives.includes(_id) || false;

  return {
    ...defaultPath,
    ...path.toObject(),
    views: path.views.length,
    archived,
    liked: true,
    commentsNumber: path.comments.length,
    likesNumber: path.likes.length,
  };
};
const dislikePath = async (
  { input }: MutationLikePathArgs,
  { _id }: { _id: string | null }
): Promise<PathType> => {
  let user;
  try {
    user = await authenticate(_id);
  } catch {
    try {
      user = await authenticate(_id, UserType["User"]);
    } catch {
      throw new Error(errors[19].id);
    }
  }

  let path;
  try {
    path = await pathModel.findById(input);
    await path.updateOne({ likes: path.likes.filter((item) => item !== _id) });
  } catch {
    throw new Error(errors[17].id);
  }
  const archived = user.archives.includes(_id) || false;

  return {
    ...defaultPath,
    ...path.toObject(),
    views: path.views.length,
    archived,
    liked: false,
    commentsNumber: path.comments.length,
    likesNumber: path.likes.length,
  };
};
const commentPath = async (
  { input }: MutationCommentPathArgs,
  { _id }: { _id: string | null }
): Promise<CommentPathResponse> => {
  let user;
  try {
    user = await authenticate(_id);
  } catch {
    try {
      user = await authenticate(_id, UserType["User"]);
    } catch {
      throw new Error(errors[19].id);
    }
  }

  let commentId = await getUnique(_id);
  let path;
  try {
    path = await pathModel.findById(input.path);
    await path.updateOne({
      comments: [
        ...path.comments,
        {
          author: _id,
          description: input.description,
          id: commentId,
        },
      ],
    });
  } catch {
    throw new Error(errors[17].id);
  }

  return {
    path: input.path,
    description: input.description,
    id: commentId,
  };
};

const removeCommentPath = async (
  { input }: { input: RemoveCommentPath },
  { _id }: { _id: string | null }
): Promise<PathType> => {
  let user;
  try {
    user = await authenticate(_id);
  } catch {
    try {
      user = await authenticate(_id, UserType["User"]);
    } catch {
      throw new Error(errors[19].id);
    }
  }

  let path;
  try {
    path = await pathModel.findById(input.path);
    await path.updateOne({
      comments: path.comments.filter((item) => item.id !== input.id),
    });
  } catch {
    throw new Error(errors[17].id);
  }
  const archived = user.archives.includes(_id) || false;

  return {
    ...defaultPath,
    ...path.toObject(),
    views: path.views.length,
    archived,
    liked: true,
    commentsNumber: path.comments.length,
    likesNumber: path.likes.length,
  };
};

const archivePath = async (
  { input }: MutationArchivePathArgs,
  { _id }: { _id: string | null }
): Promise<PathType> => {
  let user;
  try {
    user = await authenticate(_id);
  } catch {
    try {
      user = await authenticate(_id, UserType["User"]);
    } catch {
      throw new Error(errors[19].id);
    }
  }

  let path;
  try {
    path = await pathModel.findById(input);
  } catch {
    throw new Error(errors[17].id);
  }

  try {
    await user.updateOne({ archives: [...user.archives, input] });
  } catch {}

  return {
    ...defaultPath,
    ...path.toObject(),
    views: path.views.length,
    archived: true,
    liked: path.likes.includes(_id),
    commentsNumber: path.comments.length,
    likesNumber: path.likes.length,
  };
};

const restorePath = async (
  { input }: MutationArchivePathArgs,
  { _id }: { _id: string | null }
): Promise<PathType> => {
  let user;
  try {
    user = await authenticate(_id);
  } catch {
    try {
      user = await authenticate(_id, UserType["User"]);
    } catch {
      throw new Error(errors[19].id);
    }
  }

  let path;
  try {
    path = await pathModel.findById(input);
  } catch {
    throw new Error(errors[17].id);
  }

  try {
    await user.updateOne({
      archives: user.archives.filter((item) => item !== input),
    });
  } catch {}

  return {
    ...defaultPath,
    ...path.toObject(),
    views: path.views.length,
    archived: false,
    liked: path.likes.includes(_id),
    commentsNumber: path.comments.length,
    likesNumber: path.likes.length,
  };
};
function escapeRegex(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
const searchPath = async ({
  input: { pageNum, pageSize, ...searchData },
}: QuerySearchPathArgs) => {
  const search: Record<string, string> = searchData || ({} as any);
  const skips = pageSize * pageNum;
  let paths;

  const regexSearch: Record<string, RegExp> = {};
  Object.keys(search).forEach(
    (i) => (regexSearch[i] = new RegExp(escapeRegex(search[i]), "gi"))
  );
  console.log(regexSearch);

  try {
    paths = await pathModel.find({ ...regexSearch }, null, {
      skip: skips,
      limit: pageSize,
    });
  } catch (e) {
    console.log(e);
    throw new Error(errors[17].id);
  }
  return paths.map((p) => p.toObject());
};

export const resolvers: MutationResolvers | QueryResolvers = {
  createPath: createPath as any,
  mutatePath: mutatePath as any,
  deletePath: deletePath as any,
  getPath: getPath as any,
  getPaths: getPaths as any,
  getCity: () => cities.filter(i => i.id === 17) as any,
  getProvince: () => provinces.filter(i => i.id === 17) as any,
  getCountry: () => countries as any,
  likePath: likePath as any,
  dislikePath: dislikePath as any,
  commentPath: commentPath as any,
  archivePath: archivePath as any,
  restorePath: restorePath as any,
  removeCommentPath: removeCommentPath as any,
  searchPath: searchPath as any,
};
