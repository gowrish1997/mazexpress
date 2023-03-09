//==========================
//     written by: raunak
//==========================

import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";
import { createToast } from "@/lib/toasts";
import { dataSourceOptions } from "@/lib/adapter/data-source-options";
import * as entities from "../../../lib/adapter/entities";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers
  adapter: TypeORMLegacyAdapter(dataSourceOptions, { models:  }),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "email",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        // custom login logic
        // verify credentials

        // return user obj for authorized
        // return null/false for unauthorized
        const validation = fetch(
          `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            console.log(response.ok);
            if (response.ok) {
              createToast({
                type: "success",
                title: "Success",
                message: "You are now logged in.",
                timeOut: 2000,
              });
              return response.json();
            }
          })
          .then((parsedData) => {
            if (parsedData) {
              return parsedData;
            }
            return null;
          })
          .catch((err) => {
            if (err) throw err;
            console.log(err);
            return null;
          });
        return validation;
      },
    }),
  ],

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: "database",

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt

  // uncomment below for jwt auth

  // jwt: {
  //   // A secret to use for key generation (you should set this explicitly)
  //   secret: process.env.NEXTAUTH_SECRET,
  //   // Set to true to use encryption (default: false)
  //   // encryption: true,
  //   // You can define your own encode/decode functions for signing and encryption
  //   // if you want to override the default behaviour.
  //   // encode: async ({ secret, token, maxAge }) => {},
  //   // decode: async ({ secret, token, maxAge }) => {},
  // },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: "/auth/gate", // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // restrictions and blacklists
      console.log(user);
      const isAllowed = user ? true : false;
      if (isAllowed) {
        return true;
      }
      return false;
    },

    // async redirect({ url, baseUrl }) { return baseUrl },

    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: any;
      user: any;
    }) {
      // forward to client

      if (token) {
        // session.id = token.id;
      }
      return session;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      // forward to session here
      // console.log(token, user, account, profile, isNewUser);
      if (user) {
        // store info in token
        token.id = user?.id;
        token.is_admin = user.is_admin;
        // token.is_admin = user;
        return token;
      }

      return token;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, authOptions);
}
