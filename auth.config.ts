import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUser } from "./lib/actions/user.actions";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        //get the email and password from the forme using SingIn function
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        

        if (!email || !password) {
          return null;
        }

        //get the user from db
        const user = await getUser(email)
        
        
        if (!user) return null;
         
        //password validation
        const isPasswordValide = await compare(password, user.password);

        if (!isPasswordValide) return null;


        return {
            id:user.id,
            email:user.email,
            name:user.name
        } 

      },
    }),
  ],
} satisfies NextAuthConfig;
