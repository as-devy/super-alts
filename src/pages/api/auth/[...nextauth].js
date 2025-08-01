// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  trustHost: true,

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.username = profile.username;
        token.id = profile.id;
        token.avatar = profile.avatar;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.username = token.username;
      session.user.id = token.id;
      session.user.avatar = token.avatar;
      return session;
    },
  },
};

export default NextAuth(authOptions); // 👈 keep this for NextAuth to work
