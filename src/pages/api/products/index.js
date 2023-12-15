import dbConnect from "../../../util/dbConnect";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  

  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  if (method === "POST") {
    const { name } = req.body;

    try {
      // Kontrolü async bir şekilde yapabiliriz.
      const product = await Product.findOne({ name: name });

      if (product) {
        return res.status(404).json({ message: "Product already exists" });
      }

      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct); // 201 Created
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
};

export default handler;