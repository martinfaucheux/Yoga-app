import { Box, Center, Stack } from "@chakra-ui/react";

const BaseFormBox = ({ children }) => {
  return (
    <Center>
      <Box
        boxShadow={"lg"}
        mt={100}
        borderRadius={"xl"}
        background="linear-gradient(-28deg, white 75%, #A2EAC3)"
      >
        <Stack maxW={"600px"} spacing={3} padding="40px">
          {children}
        </Stack>
      </Box>
    </Center>
  );
};

export default BaseFormBox;
