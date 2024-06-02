export const calculateDaysAgo = (date: string) => {
  const currentDate = new Date();
  const creationDate = new Date(date);
  const differenceInTime = currentDate.getTime() - creationDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays == 0 ? "Today" : differenceInDays + " days ago";
};
