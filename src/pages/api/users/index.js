import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";
const handler = async (req, res) => {
  
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  if (method === "POST") {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
