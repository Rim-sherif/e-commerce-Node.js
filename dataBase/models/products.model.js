import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [3, " title is too short"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      minLength: [3, " title is too short"],
      maxlength: [300, "description is too long"],
      required: true,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
    quantatiy: {
      type: Number,
      required: true,
      default: 1,
    },
    imageCover: String,
    images: [String],
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
      required: true,
    },
    rateCount: Number,
    rateAvag: {
      type: Number,
      min: 0,
      max: 5,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    subcategory: {
      type: mongoose.Types.ObjectId,
      ref: "subCategory",
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
    },
  },
  {
    timestamps: true,
  }
);

const productsModel = mongoose.model("product", schema);

export default productsModel;
