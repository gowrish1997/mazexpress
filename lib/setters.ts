import { hashPassword } from "./bcrypt";
import { db, executeQuery } from "./db";

function updateUser(id: number, data: any) {
  const fields = { ...data };
  // console.log(fields);
  if (fields.password_users) {
    // change pass
    const hash = hashPassword(fields.password_users);
    fields.password_users = hash;
  }
  //   console.log(fields, id);
  db("users")
    .where("id_users", id)
    .update(fields)
    .then((data: any) => {
      // console.log(data);
    });
}

export { updateUser };
