import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function getUserByGoogleToken(googleAccessToken: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/google-login",
    {
      method: "POST",
      body: JSON.stringify({ googleAccessToken }),
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!res.ok) throw new Error("Failed to authorize");
  return res.json();
}

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/refresh",
    {
      method: "POST",
      headers: {
        authorization: `Refresh ${token.backendTokens.refreshToken}`,
      },
    }
  );

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     if (!credentials?.email || !credentials?.password) return null;
    //     const res = await fetch(
    //       process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login",
    //       {
    //         method: "POST",
    //         body: JSON.stringify({
    //           email: credentials.email,
    //           password: credentials.password,
    //         }),
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     if (res.status == 401) {
    //       return null;
    //     }
    //     const user = await res.json();
    //     return user;
    //   },
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "Telegram ID" },
        username: { label: "Username" },
        firstName: { label: "First Name" },
        lastName: { label: "Last Name" },
        picture: { label: "Picture" },
        authDate: { label: "Auth Date" },
        hash: { label: "Hash" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const payload = {
          id: credentials.id,
          username: credentials.username,
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          picture: credentials.picture,
          authDate: credentials.authDate,
          hash: credentials.hash,
        };
        const res = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/telegram-login",
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status == 401) {
          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        const access_token = account.access_token;
        const userData = await getUserByGoogleToken(access_token || "");
        token.user = userData.user;
        token.backendTokens = userData.backendTokens;
      }
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.backendTokens.expiresIn) return token;
      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
