import { Path } from "../schema/path";
import mongoose from "mongoose";

const StringNonRequired = { type: String, required: false };

const pathSchema = new mongoose.Schema(
  {
    origin: String,
    destination: StringNonRequired,
    maker: StringNonRequired,
    title: StringNonRequired,
    bestTime: { type: Array, required: false },
    image: StringNonRequired,
    description: StringNonRequired,
    dangerRate: { type: Number, required: false },
    suitableCar: StringNonRequired,
    interestingPlaces: { type: Number, required: false },
    placeMap: StringNonRequired,
    suitablePeople: StringNonRequired,
    Facilities: StringNonRequired,
    media: { type: Object, required: false },
    places: { type: Array, required: false },
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
