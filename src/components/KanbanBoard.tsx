import { Box, Flex } from "@chakra-ui/react";
import BoardColumn from "./BoardColumn";
import { useToDoStore, useInProgressStore, useDoneStore } from "../store/store";

function KanbanBoard() {
  const toDoIssues = useToDoStore((state) => state);
  const inProgressIssues = useInProgressStore((state) => state);
  const doneIssues = useDoneStore((state) => state);
  const columns = [
    {
      id: toDoIssues.id,
      title: toDoIssues.title,
      contents: toDoIssues.contents,
    },
    {
      id: inProgressIssues.id,
      title: inProgressIssues.title,
      contents: inProgressIssues.contents,
    },
    {
      id: doneIssues.id,
      title: doneIssues.title,
      contents: doneIssues.contents,
    },
  ];

  return (
    <Box
      px="2rem"
      py="1rem"
      style={{ height: "calc(100% - 73px)" }}
      bg="secondary"
      borderLeft="1px"
      borderColor="divider"
    >
      <Flex
        className="my-scroll-box"
        w="full"
        h="full"
        whiteSpace="nowrap"
        overflowX="auto"
        backgroundColor="secondary"
        py="1rem"
        gap="2rem"
      >
        {columns.map((column) => (
          <Box key={column.id} display="inline-block" gap="2rem">
            <BoardColumn
              issues={column.contents}
              key={column.id}
              title={column.title}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default KanbanBoard;
