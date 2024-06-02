import { Box, Flex } from "@chakra-ui/react";
import { Column } from "../types/types";
import BoardColumn from "./BoardColumn";
import { DndContext } from "@dnd-kit/core";

const mockCols: Column[] = [
  { id: "1", title: "To do" },
  { id: "2", title: "In progress" },
  { id: "3", title: "Done" },
  { id: "4", title: "smyh" },
];

function KanbanBoard() {
  return (
    <Box
      px="2rem"
      py="1rem"
      style={{ height: "calc(100% - 73px)" }}
      bg="secondary"
      borderLeft="1px"
      borderColor="divider"
    >
      <DndContext>
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
          {mockCols.map((data) => (
            <Box key={data.id} display="inline-block" gap="2rem">
              <BoardColumn key={data.id} title={data.title} />
            </Box>
          ))}
        </Flex>
      </DndContext>
    </Box>
  );
}

export default KanbanBoard;
