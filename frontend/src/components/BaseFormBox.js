import { Box, Center, Stack } from "@chakra-ui/react";

const BaseFormBox = ({ children }) => (
  <Center>
    <Box boxShadow={"lg"} mt={100} borderRadius={"xl"}>
      <Stack maxW={"600px"} spacing={3} padding="40px">
        {children}
      </Stack>
    </Box>
  </Center>
);

export default BaseFormBox;
