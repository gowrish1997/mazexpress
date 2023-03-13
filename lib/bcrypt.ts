import bcrypt from "bcrypt";


function hashPassword(password: string): string {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
  // Store hash in your password DB.
}

export { hashPassword };
