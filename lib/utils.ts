//==========================
//     written by: raunak
//==========================

const getUserImageString = (avatar_url?: string) => {
  if (avatar_url === null || avatar_url === undefined) {
    return "/user-images/default_user.png";
  } else {
    if (avatar_url.startsWith("http")) {
      return avatar_url;
    }
    return "/user-images/" + avatar_url;
  }
};

export { getUserImageString };
