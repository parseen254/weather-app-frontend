interface FormattedDate {
  weekday: string;
  day: number;
  suffix: string;
  month: string;
  year: number;
}

export const getLocaleDate = (
  unixTimestamp: number,
  timezoneOffset: number
): FormattedDate => {
  const date = new Date(unixTimestamp * 1000 + timezoneOffset * 1000);

  const weekday = date.toLocaleString("en-US", { weekday: "short" });
  const day = date.getUTCDate();
  const suffix = getDaySuffix(day);
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getUTCFullYear();

  return { weekday, day, suffix, month, year };
};

export const getDaySuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
