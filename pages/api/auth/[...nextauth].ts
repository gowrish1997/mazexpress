import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
import { MazDataSource } from "@/lib/adapter/data-source";
import { UserEntity } from "@/models/entities/User";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  // check if req route is of auth login and do login check

  // console.log(req.url);
  // if (req.url === "/api/auth/login" && req.method === "POST") {
  //   // do logic
  //   return new Promise((resolve, reject) => {
  //     const { email, password } = req.body;
  //     try {
  //       db("users")
  //         .where("email_users", email)
  //         .first()
  //         .then((data: any) => {
  //           // check if pass is same
  //           const match = bcrypt.compareSync(password, data.password_users!);

  //           if (match) {
  //             // delete data.password_users;
  //             res.json(data);
  //             resolve(data);
  //             return;
  //           } else {
  //             res.status(403).send("");
  //             reject();
  //             return;
  //           }
  //         });
  //     } catch (error) {
  //       res.status(500).json({ message: (error as Error).message });
  //       reject();
  //       return;
  //     }
  //   });
  // }

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
        async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)

          console.log(credentials);
          const reqbody = {
            email: credentials?.username!,
            password: credentials?.password!,
          };

          const user = await MazDataSource.manager.findOneBy(UserEntity, {
            email: reqbody.email,
          });
          if (user) {
            return user;
          }
          return null;
          // if (response.data) {
          //   console.log(response.data);
          //   return response.data;
          // }
          // return null;
          // const res = await fetch("/api/auth/login", {
          //   method: "POST",
          //   body: JSON.stringify(reqbody),
          //   headers: { "Content-Type": "application/json" },
          // });
          // const user = await res.json();

          // // If no error and we have user data, return it
          // if (res.ok && user) {
          //   return user;
          // }
          // // Return null if user data could not be retrieved
          // return null;
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
      // signIn: '/auth/signin',  // Displays signin buttons
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
        console.log(user, "if user is not in table add");
        return true;
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
