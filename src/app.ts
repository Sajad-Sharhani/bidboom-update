import typeDefs from "./schema/schema";
import type {
  QueryResolvers as UploadQueryResolvers,
  MutationResolvers as UploadMutationResolvers,
} from "./schema/upload";
import type {
  // QueryResolvers as AmbassadorQueryResolvers,
  MutationResolvers as UserMutationResolvers,
} from "./schema/user";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { altairExpress } from "altair-express-middleware";
import cookieParser from "cookie-parser";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLUpload } from "graphql-upload";
import { graphqlUploadExpress } from "graphql-upload";
import mongoose from "mongoose";
import morgan from "morgan";

type Resolvers = UserMutationResolvers &
  // AmbassadorQueryResolvers &
  UploadQueryResolvers &
  UploadMutationResolvers;

class App {
  public app: express.Application;

  constructor(resolvers: Resolvers) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(resolvers);
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cookieParser());
    this.app.use(morgan("tiny"));
  }

  private initializeControllers(resolvers: Resolvers) {
    const schema = makeExecutableSchema({ typeDefs });

    this.app.use(
      "/graphql",
      graphqlUploadExpress(),
      graphqlHTTP(() => ({
        schema,
        rootValue: {
          ...resolvers,
          Upload: GraphQLUpload,
        },
        graphiql: true,
      }))
    );

    this.app.use(
      "/altair",
      altairExpress({
        endpointURL: "/graphql",
      })
    );
  }

  private connectToTheDatabase() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, TEST } = process.env;
    const uri =
      process.env.NODE_ENV === "production"
        ? `mongodb+srv://admin:${MONGO_PASSWORD}@cluster0.nujhv.mongodb.net/bidboom?retryWrites=true&w=majority`
        : `mongodb://${MONGO_PATH}/${TEST ? "bidroom-test" : "bidroom"}`;
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
  }
}

export default App;
