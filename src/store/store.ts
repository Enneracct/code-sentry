import { create } from "zustand";
import { Issue } from "../types/types";

type IssueState = {
  issues: Issue[];
  setIssues: (issues: Issue[]) => void;
};

type ColumnState = {
  id: string;
  title: string;
  contents: Issue[];
  setContents: (contents: Issue[]) => void;
  pushIssue: (issue: Issue) => void;
  removeIssue: (issue: Issue) => void;
};

export const useIssueStore = create<IssueState>((set) => ({
  issues: [],
  setIssues: (issues: Issue[]) => set({ issues }),
}));

const createColumnStore = (id: string, title: string) =>
  create<ColumnState>((set) => ({
    id,
    title,
    contents: [],
    setContents: (contents: Issue[]) => set({ contents }),
    pushIssue: (issue: Issue) =>
      set((state) => ({ contents: [...state.contents, issue] })),
    removeIssue: (issue: Issue) =>
      set((state) => ({
        contents: state.contents.filter((i) => i.number !== issue.number),
      })),
  }));

export const useToDoStore = createColumnStore("open", "Open");
export const useInProgressStore = createColumnStore(
  "in-progress",
  "In Progress"
);
export const useDoneStore = createColumnStore("closed", "Closed");

export default useIssueStore;
