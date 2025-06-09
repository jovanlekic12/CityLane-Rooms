import { differenceInDays, format, formatDistance, parseISO } from "date-fns";

export const subtractDates = (dateStr1: string, dateStr2: string) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const timeDifference = (date: string) => {
  const currentDate = new Date();
  const time = formatDistance(parseISO(date), currentDate);
  return time;
};
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .replace(",", "");
}

export function formatDateWithTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
