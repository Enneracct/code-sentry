import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Column, Issue } from "../types";
import { styles } from "../utils/styles";
import BoardColumn from "./BoardColumn";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateState } from "../store/issueSlice";
import IssueCard from "./IssueCard";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);

  const issues = useSelector((state: RootState) => state.issues);
  const dispatch = useDispatch();

  useEffect(() => {
    const generatePredefinedColumns = (): Column[] => [
      {
        id: "ToDo",
        title: "ToDo",
        issues: [],
      },
      {
        id: "InProgress",
        title: "InProgress",
        issues: [],
      },
      {
        id: "Done",
        title: "Done",
        issues: [],
      },
    ];

    setColumns(generatePredefinedColumns());
  }, []);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Issue") {
      setActiveIssue(event.active.data.current.issue);
      return;
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveIssue = active.data.current?.type === "Issue";
    const isOverIssue = over.data.current?.type === "Issue";
    const isOverColumn = over.data.current?.type == "Column";

    if (!isActiveIssue) return;

    if (isActiveIssue && isOverIssue) {
      const draggedIssueId = active.id;
      const targetIssueId = over.id;

      const draggedIndex = issues.findIndex(
        (issue) => issue.number === draggedIssueId
      );
      const targetIndex = issues.findIndex(
        (issue) => issue.number === targetIssueId
      );

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const sortedIssues = Array.from(issues);
        sortedIssues.splice(draggedIndex, 1);
        sortedIssues.splice(targetIndex, 0, issues[draggedIndex]);
        dispatch(updateState(sortedIssues));
      }
    }

    if (isActiveIssue && isOverColumn) {
      const draggedIssueId = active.id;
      const targetColumnId = over.id;

      const draggedIssueIndex = issues.findIndex(
        (issue) => issue.number == draggedIssueId
      );

      if (draggedIssueIndex !== -1) {
        const updatedIssues = issues.map((issue, index) => {
          if (index === draggedIssueIndex) {
            return { ...issue, columnId: targetColumnId };
          }
          return issue;
        });

        dispatch(updateState(updatedIssues));
      }
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveIssue(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  return (
    <Flex h="100%" direction="column">
      {/* Issue title */}
      <Header />
      <DndContext
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <Box
          position="relative"
          w="100%"
          h="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor={styles["secondary-bg"]}
          color="white"
        >
          <Flex gap="5">
            <SortableContext items={columns}>
              {columns.map((col) => (
                <BoardColumn key={col.id} column={col} />
              ))}
            </SortableContext>
          </Flex>
        </Box>

        {createPortal(
          <DragOverlay>
            {activeColumn && <BoardColumn column={activeColumn} />}
            {activeIssue && <IssueCard issue={activeIssue}></IssueCard>}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </Flex>
  );
}

export default KanbanBoard;
