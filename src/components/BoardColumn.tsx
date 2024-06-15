import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import IssueCard from "./IssueCard";
import { Issue } from "../types/types";

interface ColumnProps {
  title: string;
  issues: Issue[];
}

function BoardColumn({ title, issues }: ColumnProps) {
  return (
    <Flex
      direction="column"
      borderRadius="1rem"
      h="full"
      w="550px"
      bgColor="primary"
    >
      <Flex
        p="4"
        h="66px"
        cursor="-webkit-grab"
        borderTopRadius="1rem"
        bgColor="#161616"
        fontWeight="600"
        textAlign="center"
        gap="1rem"
        alignItems="baseline"
      >
        <Heading as="h2" size="md">
          {title}
        </Heading>
        <Text>{issues.length}</Text>
      </Flex>
      <Box
        overflowY="auto"
        overflowX="clip"
        mt="1.5rem"
        mx="0.5rem"
        px="0.5rem"
      >
        {issues.map((issue) => (
          <IssueCard issue={issue} key={issue.number}></IssueCard>
        ))}
      </Box>
      <Box p="1rem"></Box>
    </Flex>
  );
}

export default BoardColumn;
