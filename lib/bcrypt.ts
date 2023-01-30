import bcrypt from "bcrypt";

const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

function hashPassword(password: string): string {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
  // Store hash in your password DB.
}

export { hashPassword };
