import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../util/mongo";
import User from "@/models/User";
import dbConnect from "@/util/dbConnect";
import signInUser from "@/util/signInUser";
dbConnect();

export default NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
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
        const user=await User.findOne({email:email});
        if (!user) {
          throw new Error("You havent regitered");
        } 
        if(user){
          return signInUser({user,password});
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  database: process.env.MONGODB_URI,
  secret:"secret",
});
