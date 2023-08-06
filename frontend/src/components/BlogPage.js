import { Heading, Text } from "@chakra-ui/react";
import PageContainer from "./PageContainer";

const BlogPage = () => {
  return (
    <PageContainer>
      <Heading>Blogs</Heading>
      <Text mt={2}>This is where blog posts will appear.</Text>
    </PageContainer>
  );
};
export default BlogPage;
