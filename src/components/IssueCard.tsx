import { Box, Heading, Flex, Avatar, Text } from "@chakra-ui/react";
import { Issue } from "../types/types";
import Label from "../ui/Label";
import { BsThreeDots } from "react-icons/bs";
import { calculateDaysAgo } from "../utils/utills";

interface IssueCardProps {
  issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  return (
    <Box
      height="fit-content"
      p="1rem"
      borderRadius="0.5rem"
      bgColor="secondary"
      mb="1rem"
      whiteSpace="normal"
      position="relative"
    >
      <Flex gap="1rem" mb="0.75rem" align="center">
        <Avatar size="sm" src={issue.user.avatar_url} />
        <Box>
          <Heading as="h1" size="md" wordBreak="normal">
            {issue.user.login} created issue #{issue.number}
          </Heading>
          <Text color="gray.500" fontSize="14px">
            {calculateDaysAgo(issue.created_at)}
          </Text>
        </Box>
      </Flex>
      {issue.labels?.length !== 0 && (
        <Flex gap="1rem" mb="0.75rem" flexWrap="wrap">
          {issue.labels?.map((label, index) => (
            <Label key={index} name={label.name} color={label.color}></Label>
          ))}
        </Flex>
      )}
      <Box>{issue.title}</Box>
      <Box position="absolute" top="3" right="4">
        <button
          style={{
            backgroundColor: "transparent",
            marginLeft: "1rem",
          }}
        >
          <BsThreeDots />
        </button>
      </Box>
    </Box>
  );
};

export default IssueCard;
