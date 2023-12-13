import dbConnect from "@/util/dbConnect";
import Category from "../../../models/Category";
const handler = async (req, res) => {
  await dbConnect();
  const { method, query: { id } } = req;

  if (method === "DELETE") {
    try {
      
      const existingCategory = await Category.findOne({ _id: id });
      if (!existingCategory) {
        return res.status(404).send({ error: "Category Not Found" });
      }

      const deletedCategory = await Category.deleteOne({ _id: id });

      res.status(200).json(deletedCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  }
  if(method==="PUT"){
    try {
        const updates = req.body;
    
        const existingCategory = await Category.findOne({ _id: id });
        if (!existingCategory) {
          return res.status(404).send({ error: "Category Not Found" });
        }
        const updatedCategory = await Category.findByIdAndUpdate(id, updates, {
          new: true,
        });
        res.status(200).send(updatedCategory);
      } catch (error) {
        res.status(500).json({ error: error });
      }
  }
};

export default handler;
