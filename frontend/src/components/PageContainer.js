import { Box } from "@chakra-ui/react";

const PageContainer = ({ children }) => {
  return (
    <Box p={4} borderRadius="lg" mx={"20"} my={10} overflow="hidden">
      {children}
    </Box>
  );
};

export default PageContainer;
