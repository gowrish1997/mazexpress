//==========================
//     written by: raunak
//==========================

import { APIResponse } from "@/models/api.model";
import { User } from "@/models/user.model";
import { NextRequest } from "next/server";
import fetchJson from "./fetchServer";
import fetchSelf from "./fetchSelf";

async function checkPassword(password: string, user_email: string) {
  const result: boolean = await fetchJson(`/api/auth/validate-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
      email: user_email,
    }),
  });
  return result;
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

async function isAuthenticated(req: NextRequest): Promise<boolean[]> {
  try {
    const sess: APIResponse<User> = await fetchJson(`/api/auth`);

    if (sess.data && sess.data.length > 0) {
      // user exists
      return [
        true,
        (sess.data as User[])[0].is_admin,
        (sess.data as User[])[0].lang == "english" ? true : false,
      ];
    } else {
      return [false];
    }
  } catch (err) {
    if (err) {
      return [false];
    }
  }
}

export { checkPassword, getDateInDBFormat, isAuthenticated };
