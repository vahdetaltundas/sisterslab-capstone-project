// import { SignJWT } from "jose";
// import { NextResponse } from "next/server";
// import { getJwtSecretKey } from "@/util/verifyJwtToken";

// export async function POST(request) {
//   const body = await request.json();

//   // Make that below if condition as your own backend api call to validate user
//   if (body.username==process.env.ADMIN_USERNAME && body.password==process.env.ADMIN_PASSWORD) {
// const token = await new SignJWT({
//   username: body.username,
//   role: "admin", // Set your own roles
// })
//   .setProtectedHeader({ alg: "HS256" })
//   .setIssuedAt()
//   .setExpirationTime("30s") // Set your own expiration time
//   .sign(getJwtSecretKey());

//     const response = NextResponse.json(
//       { success: true },
//       { status: 200, headers: { "content-type": "application/json" } }
//     );

//     response.cookies.set({
//       name: "token",
//       value: token,
//       path: "/",
//     });

//     return response;
//   }

//   return NextResponse.json({ success: false });
// }

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
