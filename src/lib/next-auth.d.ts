import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      role: "USER" | "MANAGER";
      firstName?: string;
      lastName?: string;
      username?: string;
      picture?: string;
    };
    backendTokens: BackendTokens;
  }
}

import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      role: "USER" | "MANAGER";
      firstName?: string;
      lastName?: string;
      username?: string;
      picture?: string;
    };
    backendTokens: BackendTokens;
  }
}
