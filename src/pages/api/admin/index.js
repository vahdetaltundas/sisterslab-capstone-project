import { getJwtSecretKey } from "@/util/verifyJwtToken";
import cookie from "cookie";
import { SignJWT } from "jose";

const handler = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = await new SignJWT({
        username: username,
        role: "admin", // Set your own roles
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30s") // Set your own expiration time
        .sign(getJwtSecretKey());
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ message: "Success" });
    } else {
      res.status(400).json({ message: "Wrong Credentials" });
    }
  }
};

export default handler;
