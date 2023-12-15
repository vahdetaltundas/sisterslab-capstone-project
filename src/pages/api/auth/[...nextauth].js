import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../util/mongo"; // Bu kısmı gördüğüm kadarıyla MongoDB sürücünüzü başlatmak için kullanıyorsunuz.
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import bcrypt from "bcrypt";

dbConnect(); // Bu satırı yerine dbConnect() fonksiyonunu çağırmak daha uygun olabilir.

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email: email });

        if (!user) {
          throw new Error("You haven't registered yet!");
        }

        if (user) {
          return signInUser({ user, password });
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  // database seçeneğini kullanmaktansa MongoDB sürücüsünü bağlamak için MongoDBAdapter kullanmayı deneyebilirsiniz.
  // adapter: MongoDBAdapter(clientPromise),
  database: process.env.MONGODB_URI,
  secret: "secret",
});

const signInUser = async ({ user, password }) => {
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Incorrect password!");
  }

  return user;
};
