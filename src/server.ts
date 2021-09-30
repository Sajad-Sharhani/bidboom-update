import App from "./app";
import { resolvers as pathResolvers } from "./path/path.resolver";
import errors from "./schema/errors";
import { upload } from "./upload/upload.resolver";
import { resolvers as userResolvers } from "./user/user.resolver";
import validateEnv from "./utils/validateEnv";
import { app_version } from "./utils/version";
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
    app_version: app_version,
    errors: () => {
      return errors;
    },
    errorSample: () => {
      throw new Error(errors[5].id);
    },
  });

// if (!process.env.TEST) {
app().listen();
// }
