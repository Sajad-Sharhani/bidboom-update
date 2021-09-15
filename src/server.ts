import App from "./app";
import { upload } from "./upload/upload.resolver";
import { resolvers as userResolvers } from "./user/user.resolver";
import validateEnv from "./utils/validateEnv";
import { config } from "dotenv";

config();

validateEnv();

export const app = () =>
  new App({
    ...userResolvers,
    upload,
    // createUser,
    // joinAmbassador,
  });

if (!process.env.TEST) {
  app().listen();
}
