import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";

export default {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || null,
          email: profile.email || null,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
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
