import { DefaultSession } from "next-auth";
// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
