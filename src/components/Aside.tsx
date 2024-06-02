import { Box, Flex, Heading } from "@chakra-ui/react";
import icon from "../assets/icon.svg";

function Aside() {
  return (
    <Box bgColor="primary" w="full" h="full" color="white">
      <Flex alignItems="center" p="1rem" mb="2rem">
        <img src={icon} style={{ height: "2.25rem" }} alt="" />
        <Heading
          ml="0.5rem"
          fontWeight="500"
          fontSize="x-large"
          fontFamily="logo"
          letterSpacing="1px"
        >
          CodeSentry
        </Heading>
      </Flex>
      <Flex
        direction="column"
        p="1rem"
        borderBottom="1px"
        borderColor="divider"
        color="gray.300"
        letterSpacing="0.6px"
      >
        <p>Recently Viewed</p>
      </Flex>
    </Box>
  );
}

export default Aside;
