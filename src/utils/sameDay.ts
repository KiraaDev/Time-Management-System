export const isSameDay = (date1: string | Date | undefined, date2: Date): boolean => {
  if (!date1) return false;

  // If date1 is a string, convert it to a Date object
  const taskDate = typeof date1 === "string" ? new Date(date1) : date1;

  return (
    taskDate.getFullYear() === date2.getFullYear() &&
    taskDate.getMonth() === date2.getMonth() &&
    taskDate.getDate() === date2.getDate()
  );
};