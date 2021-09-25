import App from "./app";
import { resolvers as pathResolvers } from "./path/path.resolver";
import { upload } from "./upload/upload.resolver";
import { resolvers as userResolvers } from "./user/user.resolver";
import validateEnv from "./utils/validateEnv";
import { config } from "dotenv";

console.log(config());

validateEnv();

export const app = () =>
  new App({
    ...userResolvers,
    ...pathResolvers,
    upload,
    // createUser,
    // joinAmbassador,
  });

// if (!process.env.TEST) {
  app().listen();
// }
