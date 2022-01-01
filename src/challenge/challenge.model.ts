import { Challenge, Challenger } from "../schema/challenge";
import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema(
  {
    subject: String,
    description: String,
    answers: { type: Array, required: false },
    correct: { type: Array, required: false },
    sponsors: { type: Array, required: false },
    isActive: { type: Boolean, required: false },
    media: { type: Object, required: false },
    winnersNumber: { type: Number, required: false },
    loosersNumber: { type: Number, required: false },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const challengerSchema = new mongoose.Schema(
  {
    correct: Boolean,
    answer: Number,
    challenger: String,
    challenge: String,
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);
const challengeModel = mongoose.model<Challenge & mongoose.Document>(
  "Challenge",
  challengeSchema
);
const challengerModel = mongoose.model<Challenger & mongoose.Document>(
  "Challenger",
  challengerSchema
);

export default challengeModel;
export { challengerModel };
