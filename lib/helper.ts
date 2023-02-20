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
  // format BNG-MAZ-
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

 const perPageOptinsList = () => {
  return [
      { value: "5", label: "default" },
      { value: "10", label: "10" },
      { value: "15", label: "15" },
      { value: 20, label: 20 },
      { value: 25, label: 25 },
  ];
};

export {
  capitalizeFirstLetter,
  capitalizeAllFirstLetters,
  getDateInStringFormat,
  getTimeInHourAndMinuteFormat,
  mazID,
  perPageOptinsList
};
