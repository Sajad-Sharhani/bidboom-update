import App from "./app";
import { resolvers as pathResolvers } from "./path/path.resolver";
import { upload } from "./upload/upload.resolver";
import { resolvers as userResolvers } from "./user/user.resolver";
import validateEnv from "./utils/validateEnv";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

console.log(
  config({
    path: path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      `.env${process.env.NODE_ENV === "production" ? "_prod" : "_dev"}`
    ),
  })
);

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
