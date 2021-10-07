import errors from "../schema/errors";
import { UserType } from "../schema/user";
import userModel from "../user/user.model";

export async function authenticate(
  id: string,
  type: UserType = UserType["Ambassador"]
) {
  const user = await userModel.findById(id);
  if (user.type !== type) {
    throw new Error(
      type === UserType["Ambassador"]
        ? errors[9].id
        : type === UserType["User"]
        ? errors[10].id
        : errors[11].id
    );
  }
  return user;
}

export async function multiAuthenticate(id: string) {
  let user;
  try {
    user = await authenticate(id);
  } catch {
    try {
      user = await authenticate(id, UserType["User"]);
    } catch {
      throw new Error(errors[19].id);
    }
  }
  return user;
}
