import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const userFound = await prisma.user.findUnique({
          where: {
            username: credentials.username as string,
          },
        });
        if (!userFound) throw new Error("User not found");

        const matchPassword = await bcrypt.compare(
          credentials.password as string,
          userFound.password as string
        );
        if (!matchPassword) throw new Error("Wrong password");

        return userFound;
      },
    }),
  ],
} satisfies NextAuthConfig;
