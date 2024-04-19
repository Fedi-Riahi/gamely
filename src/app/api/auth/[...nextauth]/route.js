import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import connectDatabase from "@/lib/database";
import User from "@/models/user";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
          name: "credentials",
          credentials: {},
    
          async authorize(credentials) {
            const { email, password } = credentials;
    
            try {
              await connectDatabase();
              const user = await User.findOne({ email });
    
              if (!user) {
                return null;
              }
  
    
              return user;
            } catch (error) {
              console.log("Error: ", error);
            }
          },
        }),
      ],
      session: {
        strategy: "jwt",
      },
      secret: process.env.NEXTAUTH_SECRET,
    };
    
    const handler = NextAuth(authOptions);
    
    export { handler as GET, handler as POST };