import axios from "axios";
import { Issue } from "../types";

export const fetchIssues = async (repoUrl: string): Promise<Issue[]> => {
  const repoName = repoUrl.split("/").slice(-2).join("/");
  const apiURL = `https://api.github.com/repos/${repoName}/issues`;

  try {
    const response = await axios.get<Issue[]>(apiURL);
    // Initialy assign issues to ToDo column
    const issues = response.data.map((issue) => ({
      ...issue,
      columnId: "ToDo",
    }));
    return issues;
  } catch (e) {
    console.log("An error occurred while fetching response data", e);
    return [];
  }
};

// Function to calculate days ago
export const calculateDaysAgo = (date: string) => {
  const currentDate = new Date();
  const creationDate = new Date(date);
  const differenceInTime = currentDate.getTime() - creationDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays == 0 ? "Today" : differenceInDays + " days ago";
};
