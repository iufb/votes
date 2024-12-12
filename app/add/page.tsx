import { Flex } from "@mantine/core";
import { AddParticipantForm } from "../../components";

export default async function Page() {
  return (
    <Flex justify={"center"} align={"center"} mih={"100vh"} p={30}>
      <AddParticipantForm />
    </Flex>
  );
}
