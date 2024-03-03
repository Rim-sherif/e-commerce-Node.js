import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "product",
      }
  },
  {
    timestamps: true,
  }
);

const reviewModel = mongoose.model("review", schema);

export default reviewModel;
