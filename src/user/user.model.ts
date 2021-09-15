import { User } from "../schema/user";
import mongoose from "mongoose";

const StringNonRequired = { type: String, required: false };

const userSchema = new mongoose.Schema(
  {
    name: String,
    userName: StringNonRequired,
    email: StringNonRequired,
    phoneNumber: StringNonRequired,
    image: StringNonRequired,
    description: StringNonRequired,
    usersOfIdentifierCode: StringNonRequired,
    identifierCode: StringNonRequired,
    type: StringNonRequired,
    nationalCode: StringNonRequired,
    instagram: StringNonRequired,
    touristGuideCard: StringNonRequired,
    guideType: StringNonRequired,
    expertise: StringNonRequired,
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
