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
import { User, UserType } from "../schema/user";
import cities from "../statics/city";
import countries from "../statics/country";
import provinces from "../statics/province";
import { getUnique } from "../utils/hash";
import { authenticate } from "../utils/index";
import userModel from "./../user/user.model";
import pathModel from "./path.model";
import { Document } from "mongoose";

const defaultPath: PathType = { views: 0, likesNumber: 0 } as PathType;

const createPath = async (
  { input }: MutationCreatePathArgs,
  { _id }: { _id: string | null }
): Promise<CreatePathResponse> => {
  const user = await authenticate(_id);
  let path;
  if (user.isAmbassador) {
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
  } else {
    throw new Error(errors[25].id);
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
  } catch {}
  let path;
  try {
    path = await pathModel.findById(input);
    await path.updateOne({ views: [...new Set([...path.views, _id])] });
  } catch {
    throw new Error(errors[17].id);
  }
  try {
    let users = await userModel.findById(_id);
    archived = users?.archives.includes(input) || false;
  } catch {}

  try {
    liked = path.likes.includes(user._id) || false;
  } catch {}
  let maker = await userModel.findById(path?.maker);
  return {
    ...defaultPath,
    ...path.toObject(),
    views: path?.views.length || 0,
    archived,
    liked,
    commentsNumber: path?.comments.length || 0,
    likesNumber: path?.likes.length || 0,
    name: maker?.name,
    image: maker?.image,
  };
};

const getPaths = async (
  { input }: QueryGetPathsArgs,
  { _id }: { _id: string | null }
) => {
  let user: any;
  let archived = false;

  try {
    user = await authenticate(_id);
    archived = user.archives.includes(_id) || false;
  } catch {}
  let paths;
  try {
    paths = await pathModel.find({ maker: input });
  } catch {
    throw new Error(errors[17].id);
  }

  return paths.map((path) => {
    return {
      ...defaultPath,
      ...path.toObject(),
      views: path?.views.length || 0,
      archived: !!archived,
      liked: path?.likes.includes(user?._id) || false,
      commentsNumber: path?.comments?.length || 0,
      likesNumber: path?.likes?.length || 0,
    };
  });
};

const getComments = async (
  { input }: QueryGetPathsArgs,
  { _id }: { _id: string | null }
) => {
  let user: any;
  console.log(input);

  try {
    user = await authenticate(_id);
  } catch {}
  let path;
  try {
    path = await pathModel.findById(input);
  } catch {
    throw new Error(errors[17].id);
  }
  console.log("first", path.comments);
  return path.comments.map((path) => {
    return {
      author: path?.author,
      description: path?.description,
      id: path?.id,
      name: path?.name,
      image: path?.image,
      createdAt: path?.createdAt,
    };
  });
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
          name: user.name,
          image: user?.image,
          createdAt: new Date().toLocaleString(),
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
    userName: user.userName,
    image: user?.image,
    createdAt: new Date().toLocaleString(),
    author: _id,
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
const searchPath = async (
  { input: { pageNum, pageSize, ...searchData } }: QuerySearchPathArgs,
  { _id }: { _id: string | null }
) => {
  let user: any;

  try {
    user = await authenticate(_id);
  } catch {}
  const search: Record<string, string> = searchData || ({} as any);
  const skips = pageSize * pageNum;
  let paths;

  const regexSearch: Record<string, RegExp> = {};
  Object.keys(search).forEach(
    (i) => (regexSearch[i] = new RegExp(escapeRegex(search[i]), "gi"))
  );

  try {
    paths = await pathModel.find({ ...regexSearch }, null, {
      skip: skips,
      limit: pageSize,
    });
  } catch (e) {
    console.log(e);
    throw new Error(errors[17].id);
  }
  return paths.map((p) => ({
    ...defaultPath,
    ...p.toObject(),
    views: p?.views.length || 0,
    archived: user?.archives?.includes(_id) || false,
    liked: !!p?.likes.includes(_id),
    commentsNumber: p?.comments.length || 0,
    likesNumber: p?.likes.length || 0,
  }));
};

const getPopularPaths = async (_: any, { _id }: { _id: string | null }) => {
  let user: any;

  try {
    user = await authenticate(_id);
  } catch {}

  let paths;
  try {
    paths = await pathModel.find({}, null, {
      skip: 0,
      limit: 8,
      sort: { likesNumber: 1, commentsNumber: 1 },
    });
  } catch (e) {
    console.log(e);
    throw new Error(errors[17].id);
  }
  return paths.map((p) => ({
    ...defaultPath,
    ...p.toObject(),
    views: p?.views.length || 0,
    archived: user?.archives?.includes(_id) || false,
    liked: !!p?.likes.includes(_id),
    commentsNumber: p?.comments.length || 0,
    likesNumber: p?.likes.length || 0,
  }));
};

const getArchives = async (_: any, { _id }: { _id: string | null }) => {
  let user: User & Document<any, any, any>;
  try {
    user = await userModel.findById(_id);
  } catch {
    throw new Error(errors[1].id);
  }
  const records = await pathModel.find({ _id: { $in: user?.archives } });
  console.log(records);
  return records.map((p) => ({
    ...defaultPath,
    ...p.toObject(),
    views: p?.views.length || 0,
    archived: user?.archives?.includes(_id) || false,
    liked: !!p?.likes.includes(_id),
    commentsNumber: p?.comments.length || 0,
    likesNumber: p?.likes.length || 0,
  }));
};

export const resolvers: MutationResolvers | QueryResolvers = {
  createPath: createPath as any,
  mutatePath: mutatePath as any,
  deletePath: deletePath as any,
  getPath: getPath as any,
  getPaths: getPaths as any,
  getComments: getComments as any,
  getCity: () => cities as any,
  getProvince: () => provinces as any,
  getCountry: () => countries as any,
  likePath: likePath as any,
  dislikePath: dislikePath as any,
  commentPath: commentPath as any,
  archivePath: archivePath as any,
  restorePath: restorePath as any,
  removeCommentPath: removeCommentPath as any,
  searchPath: searchPath as any,
  getPopularPaths: getPopularPaths as any,
  getArchives: getArchives as any,
};
