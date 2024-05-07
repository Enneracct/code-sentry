import { Box, Heading, Flex, Spacer } from "@chakra-ui/react";
import { Column } from "../types";
import { styles } from "../utils/styles";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import IssueCard from "./IssueCard";

interface Props {
  column: Column;
}

function BoardColumn(props: Props) {
  const { column } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const filteredIssues = useMemo(() => {
    return (state: RootState) =>
      state.issues.filter((issue) => issue.state === "open");
  }, []);

  const issues = useSelector(filteredIssues);

  const issueIds = useMemo(() => {
    return issues.map((issue) => issue.number);
  }, [issues]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <Flex
        justify="center"
        alignItems="center"
        overflowY="auto"
        ref={setNodeRef}
        style={style}
        borderRadius="0.5rem"
        border="2px"
        borderColor={styles["accent-color-one"]}
        h="630px"
        w="550px"
        bgColor={styles["primary-bg"]}
      >
        <motion.div
          animate={{ y: [-10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.5,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <MdOutlineKeyboardDoubleArrowDown
            size={64}
            color={styles["accent-color-one"]}
          />
        </motion.div>
      </Flex>
    );
  }

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      direction="column"
      borderRadius="0.5rem"
      h="630px"
      w="550px"
      bgColor={styles["primary-bg"]}
    >
      <Flex
        {...attributes}
        {...listeners}
        p="4"
        h="66px"
        cursor="-webkit-grab"
        borderTopRadius="0.5rem"
        bgColor="#161616"
        fontWeight="600"
        textAlign="center"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2" size="md">
          {column.title}
        </Heading>
        <Spacer />
      </Flex>
      <Box overflowY="auto" mt="1.5rem" mx="0.5rem" px="0.5rem">
        <SortableContext items={issueIds}>
          {issues
            .filter((issue) => issue.columnId === column.title)
            .map((issue) => (
              <IssueCard key={issue.number} issue={issue}></IssueCard>
            ))}
        </SortableContext>
      </Box>
      <Box p="1rem"></Box>
    </Flex>
  );
}

export default BoardColumn;
