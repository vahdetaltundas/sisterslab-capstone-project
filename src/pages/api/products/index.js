import dbConnect from "@/util/dbConnect";
import Product from "../../../models/Product";
const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  if (method === "POST") {
    const { name } = req.body;
    const product = await Product.findOne({ name: name });
    if (product) {
      res.status(400).json({ message: "Product already exists" });
      return;
    }
    try {
      const newProduct = await Product.create(req.body);
      res.status(200).json(newProduct);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
