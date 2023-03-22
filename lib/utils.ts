//==========================
//     written by: raunak
//==========================

import fetchJson from "./fetchServer";


async function checkPassword(password: string, user_email: string) {
  const result: boolean = await fetchJson(`/api/auth/validate-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
      email: user_email,
    }),
  });
  return result
}

function getDateInDBFormat(date: Date) {
  const dataOptions = {
    // weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  if (date) {
    const stringDBDate = new Date(date).toLocaleDateString(
      "ko-KR",
      dataOptions as any
    );
    // console.log('date',stringDate)
    const data = stringDBDate.replaceAll(". ", "-").replaceAll(".", "");
    return data;
  }
}

export { checkPassword, getDateInDBFormat };
