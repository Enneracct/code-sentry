import { styles } from "../utils/styles";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiGitRepositoryFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchIssues } from "../utils/gitHubApi";
import { Issue } from "../types";
import { addIssue, clearIssues } from "../store/issueSlice";
import icon from "../assets/icon.svg";
import { Box, Flex, Input, Button, InputGroup } from "@chakra-ui/react";

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const issues = useSelector((state: RootState) => state.issues);
  const [opacity, setOpacity] = useState(0);
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [repoName, setRepoName] = useState<string>("");
  const [ownerUsername, setOwnerUsername] = useState<string>("");

  const handleApiCall = async () => {
    const fetchedData = await fetchIssues(repoUrl);
    const repoParts = repoUrl.split("/");
    const repoOwner = repoParts[repoParts.length - 2];
    setOwnerUsername(repoOwner);
    setRepoName(repoParts.slice(-2).join("/"));
    setOpacity(1);

    if (issues.length > 0) {
      dispatch(clearIssues());
    }

    fetchedData.forEach((issue: Issue) => {
      dispatch(addIssue(issue));
    });
  };

  const proceedToRepo = (url: string) => {
    if (repoName) {
      window.open(url, "_blank");
    }
  };

  const proceedToOwnerRepo = () => {
    if (ownerUsername) {
      const ownerRepoUrl = `https://github.com/${ownerUsername}`;
      window.open(ownerRepoUrl, "_blank");
    }
  };

  return (
    <Flex
      zIndex="10"
      pos="fixed"
      p="1rem"
      justify="space-between"
      w="100%"
      bgColor={styles["primary-bg"]}
    >
      <Box display="flex" gap="1rem" alignItems="center">
        <img src={icon} style={{ height: "3rem" }} alt="" />
      </Box>
      <Flex alignItems="center" gap="1rem">
        <Box width="300px" textAlign="right" fontSize="large" color="white">
          {repoName}
        </Box>
        <InputGroup>
          <Input
            borderColor={styles["secondary-bg"]}
            bgColor="white"
            focusBorderColor={styles["accent-color-one"]}
            mr="1rem"
            placeholder="Paste GitHub repo url"
            minW="400px"
            onChange={(e) => setRepoUrl(e.target.value)}
          />
          <Button
            px="1.5rem"
            color="black"
            bgColor="white"
            onClick={handleApiCall}
          >
            Load
          </Button>
        </InputGroup>
      </Flex>
      <Box>
        <Button
          opacity={opacity}
          color="black"
          onClick={() => proceedToRepo(repoUrl)}
        >
          <RiGitRepositoryFill style={{ marginRight: "4px", color: "black" }} />
          Go to repo
        </Button>
        <Button
          ml="1rem"
          opacity={opacity}
          color="black"
          onClick={proceedToOwnerRepo}
        >
          <FaUser style={{ marginRight: "4px", color: "black" }} />
          See the owner
        </Button>
      </Box>
    </Flex>
  );
}

export default Header;
