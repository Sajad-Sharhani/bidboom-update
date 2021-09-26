import { UserType } from "../schema/user";
import userModel from "../user/user.model";

export async function authenticate(
  id: string,
  type: UserType = UserType["Ambassador"]
) {
  const user = await userModel.findById(id);
  if (user.type !== type) {
    throw new Error(`user is not an ${type}`);
  }
  return user;
}
