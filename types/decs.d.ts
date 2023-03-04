import { DataSource } from "typeorm";
import { NextApiRequest } from "next";
declare module "react-step-progress-bar";
declare module "react-notifications";
declare module "react-languages-select";
declare module "file-saver";

declare module "next" {
  interface NextApiRequest {
    db: DataSource | null;
  }
}

// written by raunak
declare module "maz-adapter" {
  interface Adapter {
    createUser: (user: any) => Awaitable<AdapterUser>;

    getUser: (id: string) => Awaitable<AdapterUser | null>;

    getUserByEmail: (email: string) => Awaitable<AdapterUser | null>;

    /** Using the provider id and the id of the user for a specific account, get the user. */
    getUserByAccount: (
      providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
    ) => Awaitable<AdapterUser | null>;

    updateUser: (user: Partial<AdapterUser>) => Awaitable<AdapterUser>;

    /** @todo Implement */
    deleteUser?: (
      userId: string
    ) => Promise<void> | Awaitable<AdapterUser | null | undefined>;

    linkAccount: (
      account: AdapterAccount
    ) => Promise<void> | Awaitable<AdapterAccount | null | undefined>;

    /** @todo Implement */
    unlinkAccount?: (
      providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
    ) => Promise<void> | Awaitable<AdapterAccount | undefined>;

    /** Creates a session for the user and returns it. */
    createSession: (session: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }) => Awaitable<AdapterSession>;

    getSessionAndUser: (sessionToken: string) => Awaitable<{
      session: AdapterSession;
      user: AdapterUser;
    } | null>;

    updateSession: (
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ) => Awaitable<AdapterSession | null | undefined>;

    /**
     * Deletes a session from the database.
     * It is preferred that this method also returns the session
     * that is being deleted for logging purposes.
     */
    deleteSession: (
      sessionToken: string
    ) => Promise<void> | Awaitable<AdapterSession | null | undefined>;

    createVerificationToken?: (
      verificationToken: VerificationToken
    ) => Awaitable<VerificationToken | null | undefined>;

    /**
     * Return verification token from the database
     * and delete it so it cannot be used again.
     */
    useVerificationToken?: (params: {
      identifier: string;
      token: string;
    }) => Awaitable<VerificationToken | null>;
  }
}
// end of written by raunak
