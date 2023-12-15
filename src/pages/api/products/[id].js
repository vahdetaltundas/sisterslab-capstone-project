import dbConnect from "../../../util/dbConnect";
import Product from "../../../models/Product";
const handler = async (req, res) => {
  await dbConnect();
  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
    try {
      const product = await Product.findOne({ _id: id });
      if (!product) {
        return res.status(404).send({ error: "Product Not Found" });
      }
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send({ error: error });
    }
  }
  if (method === "DELETE") {
    try {
      const existingProduct = await Product.findOne({ _id: id });
      if (!existingProduct) {
        return res.status(404).send({ error: "Product Not Found" });
      }

      const deletedProduct = await Product.deleteOne({ _id: id });

      res.status(200).json(deletedProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  }
  if (method === "PUT") {
    try {
      const updates = req.body;

      const existingProduct = await Product.findOne({ _id: id });
      if (!existingProduct) {
        return res.status(404).send({ error: "Product Not Found" });
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
        new: true,
      });
      res.status(200).send(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};

export default handler;
