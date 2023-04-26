import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                const res = await fetch(
                    `https://${process.env.NEXT_PUBLIC_DEPLOY_SERVER_HOST}/api/auth/login`,
                    {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const user = await res.json();

                if (user.data) {
                    // if (user.data[0].avatar_url) {
                    //     let avatar = user.data[0].avatar_url;
                    //     avatar.replace(/['"]+/g, "");
                    //     avatar =
                    //         `https://mazbackend.easydesk.work/user_uploads/` +
                    //         avatar;
                    //     user.data[0].avatar_url = avatar;
                    // }
                    return user.data[0];
                } else {
                    throw new Error(user.msg);
                }
            },
        }),
        // ...add more providers here
    ],
    // callbacks: {
    //     async jwt({ token, account,user,session }) {
    //         console.log("this is jwt functoin")
    //         console.log("jwt",session)
    //         // Persist the OAuth access_token to the token right after signin
    //         if (user) {
    //             // token.accessToken = account.access_token;
    //             token.user=user
    //         }
    //         return token;
    //     },
    //     jwt({ token, trigger, session }) {
    //         console.log(session);
    //         if (trigger === "update" && session?.name) {
    //             // Note, that `session` can be any arbitrary object, remember to validate it!
    //             token = session;
    //         }
    //         return token;
    //     },
    //     async session({ session, token, user }) {
    //         console.log("insdie session")
    //         // Send properties to the client, like an access_token from a provider.
    //         session.accessToken = token.accessToken;
    //         return session;
    //     },

    //     // async signIn({ user, account, profile, email, credentials }) {
    //     //     const isAllowedToSignIn = true;
    //     //     console.log(account.provider);
    //     //     console.log(user);
    //     //     if (isAllowedToSignIn) {
    //     //         return true;
    //     //     } else {
    //     //         // Return false to display a default error message
    //     //         return false;
    //     //         // Or you can return a URL to redirect to:
    //     //         // return '/unauthorized'
    //     //     }
    //     // },
    // },
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user, trigger, session }) {
            if (trigger == "update") {
                token.user = session;
            }
            if (user) {
                token.user = user;
            }
            return token;
            // if (trigger === "update" && session) {
            //     console.log('trigger update')
            //     token.user = session;
            // }
        },
        // async jwt({ token, trigger, session }) {
        //     console.log(token);
        //     console.log(session);
        //     if (trigger === "update" && session) {
        //         console.log("this is inside if block if jwt ");
        //         console.log(session);
        //         // Note, that `session` can be any arbitrary object, remember to validate it!
        //         token = session;
        //         return token;
        //     }
        // },
    },

    pages: {
        signIn: "/auth/gate?mode=1",
        // signOut: "/auth/signout",
        // error: "/auth/error", // Error code passed in query string as ?error=
        // verifyRequest: "/auth/verify-request", // (used for check email message)
        // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    },
};
export default NextAuth(authOptions);
