import {
  Flex,
  Input,
  CircularProgress,
  InputGroup,
  InputLeftElement,
  Box,
} from "@chakra-ui/react";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { fetchIssues } from "../api/api";
import { useDoneStore, useInProgressStore, useToDoStore } from "../store/store";
import { Issue } from "../types/types";

import {
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  QuestionOutlineIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { IconButton } from "../ui/IconButton";

function Header() {
  const [url, setUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleFetch = async (url: string): Promise<void> => {
    setIsFetching(true);
    const response = await fetchIssues(url);

    const openIssues: Issue[] = [];
    const inProgressIssues: Issue[] = [];
    const doneIssues: Issue[] = [];

    response
      ? response.forEach((issue) => {
          if (issue.state === "closed") {
            doneIssues.push(issue);
          } else if (issue.assignees.length !== 0) {
            inProgressIssues.push(issue);
          } else {
            openIssues.push(issue);
          }
        })
      : "";

    useToDoStore.setState({ contents: openIssues });
    useInProgressStore.setState({ contents: inProgressIssues });
    useDoneStore.setState({ contents: doneIssues });

    setIsFetching(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUrl(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleFetch(url);
      setUrl("");
    }
  };

  return (
    <Flex
      zIndex="10"
      pos="sticky"
      py="1rem"
      px="2rem"
      justify="space-between"
      w="100%"
      bgColor="secondary"
      borderBottom="1px"
      borderLeft="1px"
      borderColor="divider"
      borderTopLeftRadius="2rem"
      alignItems="center">
      <Box />
      <Flex alignItems="center" gap="1rem">
        <IconButton
          icon={<CalendarIcon />}
          withIconRight={<ChevronDownIcon />}
        />
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em">
            <SearchIcon />
          </InputLeftElement>
          <Input
            value={url}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            color="black"
            borderColor="secondary"
            bgColor="white"
            focusBorderColor="none"
            mr="0.5rem"
            placeholder="Paste GitHub repo url"
            minW="400px"
            rounded="full"
          />
          {isFetching && (
            <CircularProgress
              size="20px"
              isIndeterminate
              color="accentOne"
              position="absolute"
              right="1rem"
              top="50%"
              transform="translateY(-50%)"
            />
          )}
        </InputGroup>
      </Flex>
      <Flex gap={4}>
        <IconButton icon={<QuestionOutlineIcon boxSize={5} />} />
        <IconButton icon={<BellIcon boxSize={5} />} />
      </Flex>
    </Flex>
  );
}

export default Header;
