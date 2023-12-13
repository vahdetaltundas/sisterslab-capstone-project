import dbConnect from "@/util/dbConnect";
import Category from "../../../models/Category";
const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const categorys = await Category.find();
      res.status(200).json(categorys);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  if (method === "POST") {
    const { name } = req.body;
    const category = await Category.findOne({ name: name });
    if (category) {
      res.status(400).json({ message: "category already exists" });
      return;
    }
    try {
      const newCategory = await Category.create(req.body);
      res.status(200).json(newCategory);
    } catch (err) {
      console.log(err);
    }
  }
  
};

export default handler;
