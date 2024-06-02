import { Box, Heading, Flex } from "@chakra-ui/react";
import IssueCard from "./IssueCard";
import useIssueStore from "../store/store";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface ColumnProps {
  title: string;
}

function BoardColumn({ title }: ColumnProps) {
  const { issues } = useIssueStore((state) => state);

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
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2" size="md">
          {title}
        </Heading>
      </Flex>
      <Box
        overflowY="auto"
        overflowX="clip"
        mt="1.5rem"
        mx="0.5rem"
        px="0.5rem"
      >
        <SortableContext items={issues} strategy={verticalListSortingStrategy}>
          {title === "To do" &&
            issues.map((issue) => (
              <IssueCard issue={issue} key={issue.number}></IssueCard>
            ))}
        </SortableContext>
      </Box>
      <Box p="1rem"></Box>
    </Flex>
  );
}

export default BoardColumn;
