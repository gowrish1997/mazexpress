export const getTimeInHourAndMinuteFormat = (time: any) => {
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
export const getDateInStringFormat = (date: any) => {
    if (date) {
        const stringDate=new Date(date).toLocaleDateString("en-US", dataOptions as any);
        const data=stringDate.replace(',','')
        return data
    }
};
