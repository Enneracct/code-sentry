export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
  contents: Issue[];
};

export type Issue = {
  number: number;
  state: string;
  title: string;
  created_at: string;
  labels?: Label[];
  user: User;
  assignees: User[];
  pull_request?: [];
};

type Label = {
  name: string;
  color: string;
};

type User = {
  login: string;
  avatar_url: string;
};

/*

{
    "url": "https://api.github.com/repos/facebook/react/issues/29705",
    "repository_url": "https://api.github.com/repos/facebook/react",
    "labels_url": "https://api.github.com/repos/facebook/react/issues/29705/labels{/name}",
    "comments_url": "https://api.github.com/repos/facebook/react/issues/29705/comments",
    "events_url": "https://api.github.com/repos/facebook/react/issues/29705/events",
    "html_url": "https://github.com/facebook/react/pull/29705",
    "id": 2329150789,
    "node_id": "PR_kwDOAJy2Ks5xMlj1",
    "number": 29705,
    "title": "feat<Compiler>: consider that the dispatch function from `useReducer` is non-reactive",
    "user": {
        "login": "TrickyPi",
        "id": 33021497,
        "node_id": "MDQ6VXNlcjMzMDIxNDk3",
        "avatar_url": "https://avatars.githubusercontent.com/u/33021497?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/TrickyPi",
        "html_url": "https://github.com/TrickyPi",
        "followers_url": "https://api.github.com/users/TrickyPi/followers",
        "following_url": "https://api.github.com/users/TrickyPi/following{/other_user}",
        "gists_url": "https://api.github.com/users/TrickyPi/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/TrickyPi/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/TrickyPi/subscriptions",
        "organizations_url": "https://api.github.com/users/TrickyPi/orgs",
        "repos_url": "https://api.github.com/users/TrickyPi/repos",
        "events_url": "https://api.github.com/users/TrickyPi/events{/privacy}",
        "received_events_url": "https://api.github.com/users/TrickyPi/received_events",
        "type": "User",
        "site_admin": false
    },
    "labels": [
        {
            "id": 196858374,
            "node_id": "MDU6TGFiZWwxOTY4NTgzNzQ=",
            "url": "https://api.github.com/repos/facebook/react/labels/CLA%20Signed",
            "name": "CLA Signed",
            "color": "e7e7e7",
            "default": false,
            "description": null
        }
    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "assignees": [],
    "milestone": null,
    "comments": 2,
    "created_at": "2024-06-01T13:38:11Z",
    "updated_at": "2024-06-01T15:02:48Z",
    "closed_at": null,
    "author_association": "NONE",
    "active_lock_reason": null,
    "draft": false,
    "pull_request": {
        "url": "https://api.github.com/repos/facebook/react/pulls/29705",
        "html_url": "https://github.com/facebook/react/pull/29705",
        "diff_url": "https://github.com/facebook/react/pull/29705.diff",
        "patch_url": "https://github.com/facebook/react/pull/29705.patch",
        "merged_at": null
    },
    "body": "<!--\r\n  Thanks for submitting a pull request!\r\n  We appreciate you spending the time to work on these changes. Please provide enough information so that others can review your pull request. The three fields below are mandatory.\r\n\r\n  Before submitting a pull request, please make sure the following is done:\r\n\r\n  1. Fork [the repository](https://github.com/facebook/react) and create your branch from `main`.\r\n  2. Run `yarn` in the repository root.\r\n  3. If you've fixed a bug or added code that should be tested, add tests!\r\n  4. Ensure the test suite passes (`yarn test`). Tip: `yarn test --watch TestName` is helpful in development.\r\n  5. Run `yarn test --prod` to test in the production environment. It supports the same options as `yarn test`.\r\n  6. If you need a debugger, run `yarn test --debug --watch TestName`, open `chrome://inspect`, and press \"Inspect\".\r\n  7. Format your code with [prettier](https://github.com/prettier/prettier) (`yarn prettier`).\r\n  8. Make sure your code lints (`yarn lint`). Tip: `yarn linc` to only check changed files.\r\n  9. Run the [Flow](https://flowtype.org/) type checks (`yarn flow`).\r\n  10. If you haven't already, complete the CLA.\r\n\r\n  Learn more about contributing: https://reactjs.org/docs/how-to-contribute.html\r\n-->\r\n\r\n## Summary\r\n\r\nThe dispatch function from `useReducer` is stable, so it is also non-reactive.\r\n\r\nthe related PR: https://github.com/facebook/react/pull/29665\r\nthe related comment: https://github.com/facebook/react/issues/29674#issuecomment-2141432192\r\n\r\nI am not sure if the location of the new test file is appropriate😅.\r\n\r\n<!--\r\n Explain the **motivation** for making this change. What existing problem does the pull request solve?\r\n-->\r\n\r\n## How did you test this change?\r\nAdded the specific test `compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler/useReducer-returned-dispatcher-is-non-reactive.expect.md`.\r\n<!--\r\n  Demonstrate the code is solid. Example: The exact commands you ran and their output, screenshots / videos if the pull request changes the user interface.\r\n  How exactly did you verify that your PR solves the issue you wanted to solve?\r\n  If you leave this empty, your PR will very likely be closed.\r\n-->\r\n",
    "reactions": {
        "url": "https://api.github.com/repos/facebook/react/issues/29705/reactions",
        "total_count": 0,
        "+1": 0,
        "-1": 0,
        "laugh": 0,
        "hooray": 0,
        "confused": 0,
        "heart": 0,
        "rocket": 0,
        "eyes": 0
    },
    "timeline_url": "https://api.github.com/repos/facebook/react/issues/29705/timeline",
    "performed_via_github_app": null,
    "state_reason": null
}

*/
