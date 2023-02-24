import { MazAdapter } from "@/lib/adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
import { MazDataSource } from "@/lib/adapter/data-source";
import { UserEntity } from "@/lib/adapter/entities/UserEntity";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  // init maz data source???
  const Connexion = await MazDataSource;
  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),

      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "email",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials, req) => {
          // console.log(credentials);

          if (Connexion) {
            const user: UserEntity | null = await Connexion.manager.findOneBy(
              UserEntity,
              {
                email: credentials?.username!,
              }
            );
            // check if user exists
            if (user) {
              // compare password
              let match = bcrypt.compareSync(
                credentials?.password!,
                user.password!
              );
              if (match) {
                return user;
              }
            }
          }
          return null;
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
      strategy: "jwt",

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
    jwt: {
      // A secret to use for key generation (you should set this explicitly)
      secret: process.env.NEXTAUTH_SECRET,
      // Set to true to use encryption (default: false)
      // encryption: true,
      // You can define your own encode/decode functions for signing and encryption
      // if you want to override the default behaviour.
      // encode: async ({ secret, token, maxAge }) => {},
      // decode: async ({ secret, token, maxAge }) => {},
    },

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
        // console.log(user, account, profile, email, credentials);
        let connexion = await MazDataSource;
        if (connexion && user.email) {
          const dbuser = await connexion.manager.find(UserEntity, {
            where: {
              email: user.email,
            },
          });
          
          if (dbuser === null) {
            // if dbuser doesnt exist then create member and return true
            if (credentials) {
              // from cred only check
              return false;
            } else {
              // check for google
              // from google check and create
              if (account && account.provider === "google") {
                // create and sign in
                const newdbuser = new UserEntity();
                const saltRounds = 10;
                const hash2 = bcrypt.hashSync("Test123$", saltRounds);

                newdbuser.avatar_url = user.image
                  ? user.image
                  : "default_user.png";
                newdbuser.first_name = user.name ? user.name.split(" ")[0] : "";
                newdbuser.last_name = user.name ? user.name.split(" ")[1] : "";
                newdbuser.email = user.email ? user.email : "";

                newdbuser.password = hash2;
                MazAdapter().createUser(newdbuser);
                return true;
              }
              return false;
            }
          }
          // if dbuser exists then member exists login
          return true;
        }
        return false;
      },
      // async redirect({ url, baseUrl }) { return baseUrl },
      session({
        session,
        token,
        user,
      }: {
        session: any;
        token: any;
        user: any;
      }) {
        // console.log('session', session)
        return session; // The return type will match the one returned in `useSession()`
      },
      // async jwt({ token, user, account, profile, isNewUser }) { return token }
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: false,
  });
}
