import { createSlice } from "@reduxjs/toolkit";
import { Issue } from "../types";

interface IssueState {
  issues: Issue[];
}

const initialIssuesState: IssueState = {
  issues: [],
};

const issuesSlice = createSlice({
  name: "issues",
  initialState: initialIssuesState,
  reducers: {
    addIssue(state, action) {
      state.issues.push(action.payload);
    },
    updateState(state, action) {
      state.issues = action.payload;
    },
  clearIssues(state) {
      state.issues = [];
    },
  },
});

export const { addIssue, updateState, clearIssues } = issuesSlice.actions;
export default issuesSlice.reducer;
