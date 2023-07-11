const now = new Date();
const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
});

export const dateFormater = (date: Date) => {
  return formatter.format(date);
};
export const dateFormaterNow = () => {
  return formatter.format(now);
};
export const dateFormaterNowShort = () => {
  return formatter.format(now).split(",")[0];
};
export const dateFormaterNowLong = () => {
  return formatter.format(now).split(",")[1];
};
export const dateFormaterNowShortLong = () => {
  return formatter.format(now).split(",");
};

export function calculateDaysToToday(input: string) {
  const targetDate = new Date(input);
  const today = new Date();

  // Calculate the difference in milliseconds between the two dates
  const difference = targetDate.getTime() - today.getTime();

  // Convert the difference to days
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return days;
}
