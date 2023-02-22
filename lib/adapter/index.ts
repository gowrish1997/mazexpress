import { MazDataSource } from "@/lib/adapter/data-source";
import { UserEntity } from "@/lib/adapter/entities/UserEntity";
import type { Adapter } from "maz-adapter";

export function MazAdapter(): Adapter {
  return {
    async createUser(user) {
      let clientDS = await MazDataSource;
      if (clientDS) {
        console.log(user);
        //   const createduser = await MazDataSource.manager.create(UserEntity, user);
        //   console.log(createduser);
        const createduser = clientDS
          .createQueryBuilder()
          .insert()
          .into(UserEntity)
          .values(user)
          .execute();
        console.log(createduser);
        // return true;
        return createduser;
      }
      return null;
    },

    async getUser(id) {
      let clientDS = await MazDataSource;
      if (clientDS) {
        const user = clientDS.manager.findOneBy(UserEntity, {
          id: id,
        });
        return user;
      }
      return null;
    },

    async getUserByEmail(email) {
      let clientDS = await MazDataSource;
      if (clientDS) {
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
}
