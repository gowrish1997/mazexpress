import { nanoid } from "nanoid";

const getTimeInHourAndMinuteFormat = (time: any) => {
  if (time) {
    return new Date(time).toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
};

const dataOptions = {
  // weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const getDateInStringFormat = (date: any) => {
  if (date) {
    const stringDate = new Date(date).toLocaleDateString(
      "en-US",
      dataOptions as any
    );
    const data = stringDate.replace(",", "");
    return data;
  }
};

const capitalizeFirstLetter = (s: string): string => {
  let newString = s[0].toUpperCase() + s.slice(1, s.length);
  return newString;
};

const capitalizeAllFirstLetters = () => {};

const mazID = (city: string) => {
  //==========================
 //     written by: raunak
//==========================

  let append = nanoid();

  switch (city) {
    case "Tripoli":
      return "TRI" + "-MAZ-" + append;
    case "Benghazi":
      return "BNG" + "-MAZ-" + append;
    case "Misrata":
      return "MIS" + "-MAZ-" + append;
    default:
      return "TRI" + "-MAZ-" + append;
  }
};

export {
  capitalizeFirstLetter,
  capitalizeAllFirstLetters,
  getDateInStringFormat,
  getTimeInHourAndMinuteFormat,
  mazID,
};
