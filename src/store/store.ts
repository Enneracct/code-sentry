import { create } from "zustand";
import { Issue } from "../types/types";

type IssueState = {
  issues: Issue[];
  setIssues: (issues: Issue[]) => void;
};

export const useIssueStore = create<IssueState>((set) => ({
  issues: [],
  setIssues: (issues: Issue[]) => set({ issues }),
}));

export default useIssueStore;
