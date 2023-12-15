import { getJwtSecretKey } from "../../../util/verifyJwtToken";
import cookie from "cookie";
import { SignJWT } from "jose";

const handler = async (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://vahdetaltundas-e-commerce-project.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
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
        .setExpirationTime("300000000s") // Set your own expiration time
        .sign(getJwtSecretKey());
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ message: "Success", success: true });
    } else {
      res.status(200).json({ message: "Wrong Credentials", success: false });
    }
  }

  if (method === "PUT") {
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("300000000s") // Set your own expiration time
      .sign(getJwtSecretKey());
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        maxAge: -1,
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({ message: "Success" });
  }
};

export default handler;
