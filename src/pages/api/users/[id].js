import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";
const handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://vahdetaltundas-e-commerce-project.vercel.app');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Credentials', true);
  await dbConnect();
  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  if (method === "DELETE") {
    try {
      const existingUser = await User.findOne({ _id: id });
      if (!existingUser) {
        return res.status(404).send({ error: "User Not Found" });
      }

      const deletedUser = await User.deleteOne({ _id: id });

      res.status(200).json(deletedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  }
};

export default handler;
