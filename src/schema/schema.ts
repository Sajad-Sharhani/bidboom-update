import glob from "fast-glob";
import fs from "fs";

const schemas = glob.sync("**.graphql");

const typeDefs = schemas.map((file) => fs.readFileSync(file, "utf-8"));

const defaultTypeDef = `
  type Version {
    ios_version: String
    ios_force_version: String
    ios_update_link: String
    android_version: String
    android_force_version: String
    android_update_link: String
  }

  type Error {
    id: String
    description: String
  }

  type Query {
    _version_query: String
    app_version: Version
    errors: [Error!]!
    errorSample: String!
  }

  type Mutation {
    _version_mutation: String
  }
`;

export default [defaultTypeDef, ...typeDefs];
