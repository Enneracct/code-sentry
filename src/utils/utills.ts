import { Column } from "../types/types";

export const calculateDaysAgo = (date: string) => {
  const currentDate = new Date();
  const creationDate = new Date(date);
  const differenceInTime = currentDate.getTime() - creationDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays == 0 ? "Today" : differenceInDays + " days ago";
};

export const saveColumnsToLocalStorage = (repoOwner:string, columns: Column[]) => {
  localStorage.setItem(repoOwner, JSON.stringify(columns));
};

export const loadColumnsFromLocalStorage = (repoOwner): Column[] | null => {
  const columns = localStorage.getItem("kanbanColumns");
  return columns ? JSON.parse(columns) : null;
};
