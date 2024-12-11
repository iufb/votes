import { Flex } from "@mantine/core";
import { LoginForm } from "../../components/LoginForm";

export default async function Page() {
  return (
    <Flex justify={"center"} align={"center"} mih={"100vh"} p={30}>
      <LoginForm />
    </Flex>
  );
}
