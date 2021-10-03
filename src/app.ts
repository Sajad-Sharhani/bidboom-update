import typeDefs from "./schema/schema";
import type {
  QueryResolvers as UploadQueryResolvers,
  MutationResolvers as UploadMutationResolvers,
} from "./schema/upload";
import type {
  // QueryResolvers as AmbassadorQueryResolvers,
  MutationResolvers as UserMutationResolvers,
} from "./schema/user";
import GraphQLLong from "./types/Long";
import userModel from "./user/user.model";
import { verifyToken } from "./utils/hash";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { altairExpress } from "altair-express-middleware";
import cookieParser from "cookie-parser";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLUpload } from "graphql-upload";
import { graphqlUploadExpress } from "graphql-upload";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(path.dirname(import.meta.url));
type Resolvers = UserMutationResolvers &
  // AmbassadorQueryResolvers &
  UploadQueryResolvers &
  UploadMutationResolvers;

class App {
  public app: express.Application;

  constructor(resolvers: Resolvers & Record<any, any>) {
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

    this.app.use((req, res, next) => {
      let header = req.headers["authorization"] || "";
      const [, token] = header.split(" ");
      if (token) {
        const { id } = verifyToken(token);
        if (!id) {
          return next();
        }
        (req as any)["_id"] = id;
      }
      return next();
    });

    this.app.use(
      "/upload",
      express.static(path.resolve(__dirname, "../uploads"))
    );
    this.app.use(
      "/graphql",
      graphqlUploadExpress(),
      graphqlHTTP((req) => ({
        schema,
        context: {
          _id: (req as any)["_id"],
        },
        rootValue: {
          ...resolvers,
          Upload: GraphQLUpload,
          Long: GraphQLLong,
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
    const { DATABASE_URL, MONGO_PATH, TEST } = process.env;
    const uri =
      process.env.NODE_ENV === "production"
        ? `${DATABASE_URL}`
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
