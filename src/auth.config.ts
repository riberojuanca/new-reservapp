import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      profile: async (profile) => {
        // Creamos una constante para el email
        const email = profile.email;
        // Si el email no existe, devolvemos un error
        if (!email) {
          throw new Error("Email not provided by Google");
        }
        // Buscamos al usuario
        let user = await prisma.user.findUnique({
          where: { email },
        });
        // Si el usuario no existe, lo creamos
        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.name || null,
              email: profile.email,
              username: `${profile.email.split("@")[0]}_${Math.floor(
                Math.random() * 1000
              )}`,
              image: profile.picture,
            },
          });
        }
        // Devolvemos los datos del usuario
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          image: profile.picture,
        };
      },
    }),

    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      profile: async (profile) => {
        const email = profile.email;
        if (!email) {
          throw new Error("Email not provided by Google");
        }

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.name,
              email: email,
              username: `${email.split("@")[0]}_${Math.floor(
                Math.random() * 1000
              )}`,
              image: profile.avatar_url,
            },
          });
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          image: profile.avatar_url,
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
  callbacks: {
    async signIn({ account, profile }) {
      if (!account) {
        throw new Error("Account information not provided");
      }
      // Si el inicio de sesión es con credenciales, no habrá perfil
      if (account.provider === "credentials") {
        return true;
      }

      if (!profile) {
        throw new Error("Profile information not provided");
      }
      const email = profile.email;
      if (!email) {
        throw new Error("Email not provided by provider");
      }

      let existingUser = await prisma.user.findUnique({
        where: { email },
      });

      const name = profile.name || existingUser?.name || null;
      const image =
        profile.picture || profile.avatar_url || existingUser?.image || null;

      if (existingUser) {
        // Update the user's image and name with the one from the provider
        await prisma.user.update({
          where: { email },
          data: {
            image: image,
            name: name,
          },
        });
        // Associate the account with the existing user
        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          update: {
            userId: existingUser.id,
          },
          create: {
            userId: existingUser.id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            refresh_token: account.refresh_token,
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: JSON.stringify(account.session_state),
          },
        });
        return true;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
