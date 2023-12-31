import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";
import generateAvatar from "@/util/generateAvatar";
import bcrypt from "bcrypt";
const handler = async (req, res) => {
  
  await dbConnect();
  const { username, email, password } = req.body;
  
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  const genAvatar=generateAvatar(username);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      avatar: genAvatar,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
  }
};

export default handler;
