import glob from "fast-glob";
import fs from "fs";

const schemas = glob.sync("**.graphql");

const typeDefs = schemas.map((file) => fs.readFileSync(file, 'utf-8'));

const defaultTypeDef = `
  type Query {
    _version_query: String
  }

  type Mutation {
    _version_mutation: String
  }
`

export default [defaultTypeDef,...typeDefs];
