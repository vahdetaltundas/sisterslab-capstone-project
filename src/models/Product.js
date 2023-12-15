import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    img:{type: String, require: true},
    description: { type: String, required: true},
    price:{type: Number, required: true},
    categoryName:{ type: String, require: true ,maxlength:40},
    currency:{ type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
