import { app } from "../dist/server";
import mongoose from "mongoose";

export default () => {
  const uri = `mongodb://${process.env.MONGO_PATH}/${"bidroom-test"}`;
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    })
    .then((db) => db.connection.dropDatabase());
  global.httpServer = app();
  global.httpServer.listen();
  // console.log("hello", global.httpServer.listen);
};
