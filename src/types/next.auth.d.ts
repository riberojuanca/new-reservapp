import { DefaultSession } from "next-auth";

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // Añade esto si también necesitas el id del usuario
      name?: string;
      email?: string;
      image?: string | null;
      username?: string; // Añade esta línea para incluir `username`
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string; // Añade esto si también necesitas el id del usuario
    role?: string;
    username?: string; // Añade esta línea para incluir `username`
    email?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Añade esto si también necesitas el id del usuario
    role?: string;
    username?: string; // Añade esta línea para incluir `username`
    email?: string;
  }
}
