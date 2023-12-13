import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, require: true ,maxlength:40},
    img:{type: String, require: true},
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
