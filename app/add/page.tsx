import { Flex } from "@mantine/core";
import { AddParticipantForm } from "../../components";

export default function RegisterParticipant() {
  return (
    <Flex justify={"center"} align={"center"} mih={"100vh"}>
      <AddParticipantForm />
    </Flex>
  );
}
