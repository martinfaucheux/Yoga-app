import { Box } from "@chakra-ui/react";

const PageContainer = ({ children }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      {children}
    </Box>
  );
};

export default PageContainer;
