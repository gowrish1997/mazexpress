import axios from "axios";
import { hashPassword } from "./bcrypt";
import { executeQuery } from "./db";

function updateUser(id: number, data: any) {
  const fields = { ...data };
  if (fields.password_users) {
    // change pass
    const hash = hashPassword(fields.password_users);
    fields.password_users = hash;
  }
  console.log(fields, id);
  executeQuery(
    {
      query: "UPDATE users SET ? WHERE id_users = ? ",
      values: [fields, id],
    },
    (results) => {
      return(results)
    }
  );
}

export { updateUser };
