const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    localeDetection: false,
    // localePath: path.resolve("./public/locales"),
  },
  // localePath: path.resolve("./public/locales"),
  // detection: {
  //   order: ["cookie", "header"],
  //   caches: ["cookie"],
  //   cookieKey: "i18n_redirected",
  // },
};

