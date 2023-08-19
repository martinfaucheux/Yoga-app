import { Text, Flex, Box } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Flex justifyContent="center" alignItems="center" height="80vh">
      <Box>
        <Text
          textAlign="center"
          fontSize="8xl"
          fontFamily="stylizedCursive"
          color="gray.300"
        >
          Not Found
        </Text>
      </Box>
    </Flex>
  );
};

export default NotFound;
