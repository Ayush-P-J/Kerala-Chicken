import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signJwtToken } from "./lib/jwt";
import axios from "axios";
import api from "./lib/axiosInstance";
import { toast } from "react-toastify";
import { errorMessage } from "./helper/errorResponse";

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

          // if (email === 'admin@gmail.com' && password === 'admin') {
          //     return {
          //         id: '1',
          //         role: 'admin',
          //         email: 'admin@gmail.com',
          //     }
          // }

          const response = await axios.post(
            "http://localhost:4000/api/auth/login",
            {
              email,
              password,
            }
          );

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
          const {message} = error?.response?.data

          toast.error(
            message || "Something Went Wrong"
          );

          return error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.jwt = signJwtToken(user); 
      }

      return token;
    },
    async session({ session, token }) {
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
      return `${baseUrl}/dashboard`;
    },
  },
});
