import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { styles } from "../utils/styles";
import { calculateDaysAgo } from "../utils/gitHubApi";
import { Issue } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

interface IssueProps {
  issue: Issue;
}

const IssueCard: React.FC<IssueProps> = ({ issue }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: issue.number,
    data: {
      type: "Issue",
      issue,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        ref={setNodeRef}
        style={style}
        h="100px"
        border="2px"
        borderColor={styles["accent-color-one"]}
        borderRadius="0.5rem"
        color={styles["accent-color-one"]}
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
          <MdOutlineKeyboardDoubleArrowDown opacity="60%" size="48" />
        </motion.div>
      </Box>
    );
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      p="1rem"
      borderRadius="0.5rem"
      bgColor={styles["secondary-bg"]}
      mb="1rem"
    >
      <Heading as="h3" size="md" mb="0.5rem">
        {issue.title}
      </Heading>
      <Flex justify="space-between">
        <Text>Issue: {issue.number}</Text>
        <Text>{calculateDaysAgo(issue.created_at)}</Text>
      </Flex>
    </Box>
  );
};

export default IssueCard;
