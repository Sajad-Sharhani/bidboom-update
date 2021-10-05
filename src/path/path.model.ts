import { Path } from "../schema/path";
import mongoose from "mongoose";

const StringNonRequired = { type: String, required: false };

const pathSchema = new mongoose.Schema(
  {
    origin: String,
    destination: StringNonRequired,
    originPoint: String,
    destinationPoint: StringNonRequired,
    maker: StringNonRequired,
    title: StringNonRequired,
    bestTime: { type: Array, required: false },
    image: StringNonRequired,
    description: StringNonRequired,
    dangerRate: { type: Number, required: false },
    suitableCar: { type: Array, required: false },
    interestingPlaces: { type: Number, required: false },
    placeMap: StringNonRequired,
    suitablePeople: { type: Array, required: false },
    Facilities: { type: Array, required: false },
    media: { type: Object, required: false },
    places: { type: Array, required: false },
    comments: { type: Array, required: false },
    likes: { type: Array, required: false },
    views: { type: Number, required: false },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const pathModel = mongoose.model<Path & mongoose.Document>("Path", pathSchema);

export default pathModel;
