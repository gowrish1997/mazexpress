//==========================
//     written by: raunak
//==========================

import fetchJson from "./fetchServer";

const getUserImageString = (avatar_url?: string) => {
  return avatar_url
  // if (avatar_url === null || avatar_url === undefined) {
  //   return "https://mazapi.easydesk.work/api/users/images/default_user.png";
  // } else {
  //   if (avatar_url.startsWith("http")) {
  //     return avatar_url;
  //   }
  //   return "/user-images/" + avatar_url;
  // }
};

async function checkPassword(password: string, user_id: string) {
  const result: boolean = await fetchJson(`/api/auth/validate-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
      user: user_id,
    }),
  });
  return result
}

export { getUserImageString, checkPassword };
