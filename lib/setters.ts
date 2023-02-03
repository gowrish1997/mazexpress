import { hashPassword } from "./bcrypt";
import { db } from "./db";
import { createToast } from "./toasts";

async function updateUser(id: number, data: any) {
  try {
    const fields = { ...data };
    if (fields.password_users) {
      // change pass
      const hash = hashPassword(fields.password_users);
      fields.password_users = hash;
    }
    db("users")
      .where("id_users", id)
      .update(fields)
      .then((data: any) => {
        return true;
      });
  } catch (err) {
    console.log(err);
    createToast({
      type: "error",
      title: "unknown error",
      message: "check console",
    });
    return false
  }
}

export { updateUser };
