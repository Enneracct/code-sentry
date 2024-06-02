import KanbanBoard from "./components/KanbanBoard";
import Aside from "./components/Aside";
import { Flex, Box } from "@chakra-ui/react";
import Header from "./components/Header";

function App() {
  return (
    <Flex h="100%">
      <Box w="300px">
        <Aside />
      </Box>
      <Flex direction="column" h="full" style={{ width: "calc(100% - 300px)" }}>
        <Header />
        <KanbanBoard />
      </Flex>
    </Flex>
  );
}

export default App;
