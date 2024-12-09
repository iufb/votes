import { Flex } from "@mantine/core";
import { LoginForm } from "../../components/LoginForm";

export default function Login() {
  return (
    <Flex mih={"100vh"} align={"center"} justify={"center"}>
      <LoginForm />
    </Flex>
  );
}
