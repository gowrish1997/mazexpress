import { User } from "@/models/entity/User";
import axios from "axios";


export async function MazAdapter() {

  const server_path = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`

  return {
    async createUser(user: any) {
      // create new user in db with data 
      const response = await axios.post(server_path + '/users')
      if (response.data) {
        return response.data
      } else {
        return null;
      }
    },

    async login(username: string, password: string): Promise<User|null> {
      return new Promise(async (resolve, reject) => {
        axios.post(server_path + `/api/auth/login`, { username, password }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          console.log("response data from login", response.data)
          if (response.data) {
            resolve(response.data)
          } else {
            resolve(null)
          }
        }).catch((err) => {
          if(err) throw err;
          console.log(err)
        })
      })
    },

    async getUser(id: string) {
      // get user from db with id 
      const response = await axios.get(server_path + `/users?id=${id}`)
      if (response.data) {
        return response.data
      } else {
        return null;
      }
    },

    async getUserByEmail(email: string) {
      // get user from db with email 
      const response = await axios.get(server_path + `/users?email=${email}`)
      if (response.data) {
        return response.data
      } else {
        return null;
      }
    },
    // async getUserByAccount({ providerAccountId, provider }) {
    //   return;
    // },
    // async updateUser(user) {
    //   return;
    // },
    // async deleteUser(userId) {
    //   return;
    // },
    // async linkAccount(account) {
    //   return;
    // },
    // async unlinkAccount({ providerAccountId, provider }) {
    //   return;
    // },
    // async createSession({ sessionToken, userId, expires }) {
    //   return;
    // },
    // async getSessionAndUser(sessionToken) {
    //   return;
    // },
    // async updateSession({ sessionToken }) {
    //   return;
    // },
    // async deleteSession(sessionToken) {
    //   return;
    // },
    // async createVerificationToken({ identifier, expires, token }) {
    //   return;
    // },
    // async useVerificationToken({ identifier, token }) {
    //   return;
    // },
  };

}
