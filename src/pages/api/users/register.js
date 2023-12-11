import dbConnect from "@/util/dbConnect";
import User from "../../../models/User";
import generateAvatar from "@/helper/generateAvatar";
import bcrypt from "bcrypt";
const handler = async (req, res) => {
    await dbConnect();
    const { username, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
  
    try {
        const newUser = await new User({
            username,
            email,
            password,
            avatar: generateAvatar(username),
          });
      // generate salt to has password
      const salt = await bcrypt.genSalt(10);
      // create hash
      newUser.password = await bcrypt.hash(newUser.password, salt);
      await newUser.save();
      res.status(200).json(newUser);
      // set password to hashed
    } catch (err) {
      console.log(err);
    }
  };
  
  export default handler;