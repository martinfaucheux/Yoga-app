import { Heading, Text } from "@chakra-ui/react";
import PageContainer from "./PageContainer";

const AboutPage = () => {
  return (
    <PageContainer>
      <Heading>About</Heading>
      <Text mt={2}>
        My name is Céline and I am the best Yoga teacher in the world!
      </Text>
    </PageContainer>
  );
};
export default AboutPage;
