import { Notification } from "../schema/user";
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    type: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const notificationModel = mongoose.model<
  Notification & { createdAt: string } & mongoose.Document
>("Notification", notificationSchema);

export default notificationModel;
