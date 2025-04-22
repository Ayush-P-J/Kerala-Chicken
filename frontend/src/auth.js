import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signJwtToken } from "./lib/jwt";
import axios from "axios";
import api from "./lib/axiosInstance";
import { toast } from "react-toastify";
import { errorMessage } from "./helper/errorResponse";
import jwt from "jsonwebtoken";


export const { handlers, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email", placeholder: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          // console.log(credentials)

          // if (email === 'admin@gmail.com' && password === 'admin') {
          //     return {
          //         id: '1',
          //         role: 'admin',
          //         email: 'admin@gmail.com',
          //     }
          // }

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/login`,
            {
              email,
              password,
            }
          );

          // console.log(response)

          if (response.data.success) {
            const { data } = response.data;
            return {
              id: data.id,
              email: data.email,
              role: data.role,
            };
          }

          return null;
        } catch (error) {
          console.error(
            "Authorize error:",
            error.response?.data || error.message
          );

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = signJwtToken(user);
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        return token;
      }
      // If already logged in, verify token manually
      try {
        const decoded = jwt.verify(token.jwt, process.env.AUTH_SECRET); // <-- This checks expiry
        return token;
      } catch (error) {
        console.log("JWT expired:", error.message);
        // Expired or invalid token, clear it
        return {};
      }
    },
    async session({ session, token }) {
      if (!token || !token.jwt) {
        return null; // This clears the session on the client
      }
      console.log(token);
      if (token) {
        session.user = {
          id: token.id,
          role: token.role,
          email: token.email,
        };
      }
      session.jwt = token.jwt;
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("baseUrl") 
      console.log(url) 
      if (url === "/api/auth/signout" || url.includes("signout")) {
        return baseUrl; // back to home
      }
      return `${baseUrl}/dashboard`;
    },
  },
});
