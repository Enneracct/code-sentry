import axios from "axios";
import { Issue } from "../types/types";

export const fetchIssues = async (repoUrl: string): Promise<Issue[]> => {
  const repoName = repoUrl.split("/").slice(-2).join("/");
  const apiURL = `https://api.github.com/repos/${repoName}/issues?per_page=10`;

  try {
    const response = await axios.get<Partial<Issue>[]>(apiURL);
    const issues = response.data.map((issue) => transformIssue(issue));
    return issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};

const transformIssue = (issue: Partial<Issue>): Issue => {
  return {
    id: issue.number!,
    number: issue.number!,
    state: issue.state!,
    title: issue.title!,
    created_at: issue.created_at!,
    labels: issue.labels?.map((label) => ({
      name: label.name,
      color: label.color,
    })),
    user: {
      login: issue.user!.login,
      avatar_url: issue.user!.avatar_url,
    },
  };
};
