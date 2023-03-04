// import { DataSource } from "typeorm";
import type { Adapter } from "maz-adapter";
import { UserEntity } from "./entities/UserEntity";
import { MazDataSource } from "./data-source.drei.cjs";

export async function MazAdapter(): Promise<Adapter | null> {
  let clientDS = await MazDataSource;
  if (clientDS) {
    return {
      async createUser(user) {
        if (clientDS !== null) {
          // console.log(user);
          const createduser = await clientDS.manager.create(UserEntity, user);
          console.log(createduser);

          // return true;
          return createduser;
        }
        return null;
      },

      async getUser(id) {
        if (clientDS !== null) {
          const user = await clientDS.manager.findOneBy(UserEntity, {
            id: id,
          });
          return user;
        }
        return null;
      },

      async getUserByEmail(email) {
        if (clientDS !== null) {
          const user = await clientDS.manager.findOneBy(UserEntity, {
            email: email,
          });
          return user;
        }
        return null;
      },
      async getUserByAccount({ providerAccountId, provider }) {
        return;
      },
      async updateUser(user) {
        return;
      },
      async deleteUser(userId) {
        return;
      },
      async linkAccount(account) {
        return;
      },
      async unlinkAccount({ providerAccountId, provider }) {
        return;
      },
      async createSession({ sessionToken, userId, expires }) {
        return;
      },
      async getSessionAndUser(sessionToken) {
        return;
      },
      async updateSession({ sessionToken }) {
        return;
      },
      async deleteSession(sessionToken) {
        return;
      },
      async createVerificationToken({ identifier, expires, token }) {
        return;
      },
      async useVerificationToken({ identifier, token }) {
        return;
      },
    };
  } else {
    return null;
  }
}
