import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      username: string;
      role: string;
      firstName?: string;
      lastName?: string;
    };
    backendTokens: {
      accessToken: string;
      refreshToken: string;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      username: string;
      role: string;
      firstName?: string;
      lastName?: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
