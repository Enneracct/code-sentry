import { Flex, Input, Button, InputGroup } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { fetchIssues } from "../api/api";
import useIssueStore from "../store/store";

function Header() {
  const [url, setUrl] = useState("");

  const handleFetch = async (url: string): Promise<void> => {
    const response = await fetchIssues(url);

    useIssueStore.setState({ issues: response });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUrl(e.target.value);
  };

  return (
    <Flex
      zIndex="10"
      pos="sticky"
      py="1rem"
      px="2rem"
      justify="center"
      w="100%"
      bgColor="secondary"
      borderBottom="1px"
      borderLeft="1px"
      borderColor="divider"
      borderTopLeftRadius="2rem"
      alignItems="center"
    >
      <Flex alignItems="center" gap="1rem">
        <InputGroup>
          <Input
            value={url}
            onChange={handleChange}
            color="black"
            borderColor="secondary"
            bgColor="white"
            focusBorderColor="accentOne"
            mr="1rem"
            placeholder="Paste GitHub repo url"
            minW="400px"
          />
          <Button
            px="1.5rem"
            color="black"
            bgColor="white"
            onClick={() => handleFetch(url)}
          >
            Load
          </Button>
        </InputGroup>
      </Flex>
    </Flex>
  );
}

export default Header;

/*

{
  "url": "https://api.github.com/repos/huggingface/lerobot/issues/163",
  "repository_url": "https://api.github.com/repos/huggingface/lerobot",
  "labels_url": "https://api.github.com/repos/huggingface/lerobot/issues/163/labels{/name}",
  "comments_url": "https://api.github.com/repos/huggingface/lerobot/issues/163/comments",
  "events_url": "https://api.github.com/repos/huggingface/lerobot/issues/163/events",
  "html_url": "https://github.com/huggingface/lerobot/pull/163",
  "id": 2287703136,`
  "node_id": "PR_kwDOLKB0uM5u_dlC",
  "number": 163,
  "title": "Make `delta_timestamps` in the policy",
  "user": {
      "login": "alexander-soare",
      "id": 16543381,
      "node_id": "MDQ6VXNlcjE2NTQzMzgx",
      "avatar_url": "https://avatars.githubusercontent.com/u/16543381?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/alexander-soare",
      "html_url": "https://github.com/alexander-soare",
      "followers_url": "https://api.github.com/users/alexander-soare/followers",
      "following_url": "https://api.github.com/users/alexander-soare/following{/other_user}",
      "gists_url": "https://api.github.com/users/alexander-soare/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/alexander-soare/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/alexander-soare/subscriptions",
      "organizations_url": "https://api.github.com/users/alexander-soare/orgs",
      "repos_url": "https://api.github.com/users/alexander-soare/repos",
      "events_url": "https://api.github.com/users/alexander-soare/events{/privacy}",
      "received_events_url": "https://api.github.com/users/alexander-soare/received_events",
      "type": "User",
      "site_admin": false
  },
  "labels": [],
  "state": "open",
  "locked": false,
  "assignee": null,
  "assignees": [],
  "milestone": null,
  "comments": 0,
  "created_at": "2024-05-09T13:29:09Z",
  "updated_at": "2024-05-09T13:29:15Z",
  "closed_at": null,
  "author_association": "COLLABORATOR",
  "active_lock_reason": null,
  "draft": true,
  "pull_request": {
      "url": "https://api.github.com/repos/huggingface/lerobot/pulls/163",
      "html_url": "https://github.com/huggingface/lerobot/pull/163",
      "diff_url": "https://github.com/huggingface/lerobot/pull/163.diff",
      "patch_url": "https://github.com/huggingface/lerobot/pull/163.patch",
      "merged_at": null
  },
  "body": "## What this does\r\nThis PR is a moves the `delta_timestamps` logic to the policy. The reasons for doing so are:\r\n\r\n1. We don't want to use an `eval` for dynamically evaluating a config expression.\r\n2. The policy should really own this logic as it almost entirely depends on policy hyperparameters (apart from fps).\r\n3. There are no hyperparameters dedicated to `delta_timestamps` alone, so it should be made at runtime. \r\n\r\n## How it was tested\r\nExplain/show how you tested your changes.\r\n\r\nExamples:\r\n- Added `test_something` in `tests/test_stuff.py`.\r\n- Added `new_feature` and checked that training converges with policy X on dataset/environment Y.\r\n- Optimized `some_function`, it now runs X times faster than previously.\r\n\r\n## How to checkout & try? (for the reviewer)\r\nProvide a simple way for the reviewer to try out your changes.\r\n\r\nExamples:\r\n```bash\r\nDATA_DIR=tests/data pytest -sx tests/test_stuff.py::test_something\r\n```\r\n```bash\r\npython lerobot/scripts/train.py --some.option=true\r\n```\r\n\r\n## SECTION TO REMOVE BEFORE SUBMITTING YOUR PR\r\n**Note**: Anyone in the community is free to review the PR once the tests have passed. Feel free to tag\r\nmembers/contributors who may be interested in your PR. Try to avoid tagging more than 3 people.\r\n\r\n**Note**: Before submitting this PR, please read the [contributor guideline](https://github.com/huggingface/lerobot/blob/main/CONTRIBUTING.md#submitting-a-pull-request-pr).\r\n",
  "reactions": {
      "url": "https://api.github.com/repos/huggingface/lerobot/issues/163/reactions",
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
  "timeline_url": "https://api.github.com/repos/huggingface/lerobot/issues/163/timeline",
  "performed_via_github_app": null,
  "state_reason": null,
  "columnId": "ToDo"
}

*/
