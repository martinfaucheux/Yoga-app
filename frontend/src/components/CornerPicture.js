import { Image } from "@chakra-ui/react";

const CornerPicture = () => {
  return (
    <Image
      src="https://images.unsplash.com/photo-1617173945092-1c6622e5b651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
      alt="Unsplash Image"
      position="fixed"
      bottom="0"
      right="0"
      opacity="0.5"
      zIndex="-1"
      width="28%"
    />
  );
};

export default CornerPicture;
