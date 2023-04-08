import { User } from "@/models/user.model";
import axios from "axios";
import { nanoid } from "nanoid";

export interface IWhiteListedUser extends Partial<User> {
  whitelist_id: string;
}

export class AuthManager {
  white_list_users: IWhiteListedUser[];
  status: string;

  constructor() {
    this.white_list_users = [];
    this.status = "no one here";
  }

  add_white_list_user(user: IWhiteListedUser) {
    const whitelisted_user: IWhiteListedUser = user;
    if (this.white_list_users && this.white_list_users.length >= 0) {
      // add a user to whitelisted list
      this.white_list_users.push(whitelisted_user);
      this.status = "populated";
    } else {
      this.white_list_users = [whitelisted_user];
    }
  }

  getUser(id?: string): null | IWhiteListedUser {
    try {
      if (!id && this.white_list_users.length > 1) {
        return this.white_list_users.at(0);
      }
      if (this.white_list_users.length === 1) {
        return this.white_list_users[0];
      }
      const user = this.white_list_users.find((el) => el.whitelist_id === id);
      if (user) return user;
      return null;
    } catch (err) {
      console.error(err);
    }
  }

  async mutateUser(
    id: string,
    obj: Partial<User>,
    done: (err: Error, done: boolean) => void
  ) {
    try {
      // set user to updated value on both backend and frontend
      if (id) {
        const new_list = this.white_list_users.map(async (el) => {
          if (el.whitelist_id === id) {
            axios
              .put(
                `https://${process.env.NEXT_PUBLIC_SERVER_HOST}/api/users/${el.email}`,
                obj
              )
              .then((response) => {
                return Object.assign(el, obj);
              })
              .catch((err) => {
                if (err) throw err;
              });
          }
          return el;
        });
        this.white_list_users = await Promise.all(new_list);
        done(null, true);
        return;
      }

      if (!(this.white_list_users.length > 0)) {
        done(null, false);
        return;
      }

      // return first el
      axios
        .put(
          process.env.NODE_ENV === "development"
            ? `http://localhost:5000/api/auth/login/password`
            : `https://${process.env.NEXT_PUBLIC_SERVER_HOST}/api/users/${this.white_list_users[0].email}`,
          obj
        )
        .then((response) => {
          return Object.assign(this.white_list_users[0], obj);
        })
        .catch((err) => {
          if (err) throw err;
        });
      Object.assign(this.white_list_users[0], obj);
      done(null, true);
    } catch (err) {
      if (err) {
        console.error(err);
        done(err, false);
      }
    }
  }

  async login(
    username: string,
    password: string,
    cb?: (err: any, done: boolean | IWhiteListedUser) => void
  ) {
    try {
      axios
        .post(
          process.env.NODE_ENV === "development"
            ? `http://localhost:5000/api/auth/login/password`
            : `https://${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auth/login/password`,
          {
            username: username,
            password: password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          // add user to whitelist
          console.log(response);

          if (response.data.data.length > 0) {
            const whitelist_id = nanoid();
            this.add_white_list_user({
              ...response.data.data[0],
              whitelist_id: whitelist_id,
            });
            localStorage.setItem(
              "active_user",
              JSON.stringify(this.getUser(whitelist_id))
            );
            if (response.data.data[0].is_admin) {
              localStorage.setItem("is_admin", "true");
            } else {
              localStorage.setItem("is_admin", "false");
            }

            cb(null, {
              ...response.data.data[0],
              whitelist_id: whitelist_id,
            });
          } else {
            cb(null, false);
          }
        })
        .catch((err) => {
          if (err) cb(err, false);
        });
    } catch (err) {
      if (err) {
        console.error(err);
        cb(err, false);
      }
    }
  }

  async logout(id: string | null, cb?: (err: any, done: boolean) => void) {
    try {
      // call reset active user after logout somehow
      // and mutate screen

      if (this.white_list_users.length === 0) {
        cb(null, false);
        return;
      }
      if (!(this.white_list_users.length === 1) && !id) {
        cb(null, false);
        return;
      }

      if (this.white_list_users.length === 1) {
        const to_be_logged_out = this.white_list_users.pop();
        axios
          .post(
            process.env.NODE_ENV === "development"
              ? `http://localhost:5000/api/auth/logout`
              : `https://${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auth/logout`,
            {},
            { withCredentials: true }
          )
          .then((response) => {
            // removes from global whitelist
            // console.log(response);
            // this.white_list_users = this.white_list_users.filter(
            //   (el) => el.whitelist_id !== id
            // );
            localStorage.removeItem("active_user");
            localStorage.removeItem("is_admin");
            // document.cookie = "is_admin" + "=; Path=/;";
            cb(null, true);
            return;
          })
          .catch((err) => {
            if (err) throw err;
          });

        return;
      }
      axios
        .post(
          process.env.NODE_ENV === "development"
            ? `http://localhost:5000/api/auth/logout`
            : `https://${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auth/logout`,
          {},
          { withCredentials: true }
        )
        .then((response) => {
          // removes from global whitelist
          console.log(response);
          this.white_list_users = this.white_list_users.filter(
            (el) => el.whitelist_id !== id
          );
          localStorage.removeItem("active_user");
          // document.cookie = "is_admin" + "=; Path=/;";
          cb(null, true);
          return;
        })
        .catch((err) => {
          if (err) throw err;
        });
    } catch (err) {
      if (err) console.error(err);
    } finally {
      if (this.white_list_users.length === 0) {
        // set status
        this.status = "no one here";
      } else {
        this.status = "populated";
      }
    }
  }
}
const jetpass = new AuthManager();
export default jetpass;
