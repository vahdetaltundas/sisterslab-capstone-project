import dbConnect from "../../../util/dbConnect";
import Category from "../../../models/Category";
const handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://vahdetaltundas-e-commerce-project.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
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
