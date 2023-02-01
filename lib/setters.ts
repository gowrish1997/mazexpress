import { hashPassword } from "./bcrypt";
import { db } from "./db";

function updateUser(id: number, data: any) {
  const fields = { ...data };
  if (fields.password_users) {
    // change pass
    const hash = hashPassword(fields.password_users);
    fields.password_users = hash;
  }
  db("users").where("id_users", id).update(fields);
}



export { updateUser };
