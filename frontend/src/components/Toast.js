import { useToast } from "@chakra-ui/react";

export const useErrorToast = () => {
  const toast = useToast();
  return () =>
    toast({
      title: "Hmmm... Something did go wrong",
      status: "error",
      isClosable: true,
    });
};
