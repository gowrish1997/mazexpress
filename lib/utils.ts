//==========================
//     written by: raunak
//==========================

import fetchJson from "./fetchServer";

const getUserImageString = (avatar_url?: string) => {
    return avatar_url;
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

export { getUserImageString, checkPassword, getDateInDBFormat };
