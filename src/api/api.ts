import axios from "axios";
import { Issue } from "../types/types";

export const fetchIssuesByState = async (
  repoUrl: string,
  state: string
): Promise<Issue[]> => {
  const repoName = repoUrl.split("/").slice(-2).join("/");
  const apiURL = `https://api.github.com/repos/${repoName}/issues?state=${state}&per_page=20&type=issue`;

  try {
    const response = await axios.get<Partial<Issue>[]>(apiURL);
    const issues = response.data.map((issue) => transformIssue(issue));
    return issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};

export const fetchIssues = async (
  repoUrl: string
): Promise<Issue[] | undefined> => {
  try {
    const [openIssues, closedIssues] = await Promise.all([
      fetchIssuesByState(repoUrl, "open"),
      fetchIssuesByState(repoUrl, "closed"),
    ]);
    const listedIssues = openIssues.concat(closedIssues);
    return listedIssues;
  } catch (e) {
    console.error("Failed to fetch issues:", e);
  }
};

const transformIssue = (issue: Partial<Issue>): Issue => {
  return {
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
    assignees: issue.assignees
      ? issue.assignees.map((assignee) => ({
          login: assignee.login,
          avatar_url: assignee.avatar_url,
        }))
      : [],
  };
};
