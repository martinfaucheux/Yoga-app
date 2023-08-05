import { Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const SessionDetailPage = () => {
  const { sessionId } = useParams();
  return (
    <>
      <Heading>This is the page of session {sessionId}</Heading>
      <Text>Details will be here</Text>
    </>
  );
};
export default SessionDetailPage;
