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

const getDateInStringFormat = (date: Date) => {
  // console.log(date)

  if (date) {
    const stringDate = new Date(date).toLocaleDateString(
      "en-US",
      dataOptions as any
    );
    // console.log('date',stringDate)
    const data = stringDate.replace(",", "");
    return data;
  }
};

const capitalizeFirstLetter = (s: string): string => {
  let newString = s[0].toUpperCase() + s.slice(1, s.length);
  return newString;
};

export {
  capitalizeFirstLetter,
  getDateInStringFormat,
  getTimeInHourAndMinuteFormat,
};
