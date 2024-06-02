import { Box, Heading, Flex, Avatar, Text } from "@chakra-ui/react";
import { Issue } from "../types/types";
import Label from "../ui/Label";
import { DeleteIcon, DragHandleIcon } from "@chakra-ui/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { calculateDaysAgo } from "../utils/utills";

interface IssueCardProps {
  issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: issue.number,
      data: {
        type: "Issue",
        issue,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Box
      height="fit-content"
      ref={setNodeRef}
      style={style}
      p="1rem"
      borderRadius="0.5rem"
      bgColor="secondary"
      mb="1rem"
      whiteSpace="normal"
      position="relative"
    >
      <Flex gap="1rem" mb="1rem" align="center">
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
      <Flex gap="1rem" mb="1rem" flexWrap="wrap">
        {issue.labels?.map((label, index) => (
          <Label key={index} name={label.name} color={label.color}></Label>
        ))}
      </Flex>
      <Box>{issue.title}</Box>
      <Box
        position="absolute"
        top="3"
        right="4"
        onMouseEnter={() => setIsDisplayed(true)}
        onMouseLeave={() => setIsDisplayed(false)}
      >
        {isDisplayed && (
          <button>
            <DeleteIcon color="gray.400" />
          </button>
        )}

        <button
          {...attributes}
          {...listeners}
          style={{
            backgroundColor: "transparent",
            marginLeft: "1rem",
          }}
        >
          <DragHandleIcon color="gray.400" />
        </button>
      </Box>
    </Box>
  );
};

export default IssueCard;
