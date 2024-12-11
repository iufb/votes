"use client";
import { Button, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { FormContainer } from "./FormContainer";
import { GetUserInfoRequest, LoginRequst } from "./shared/api/routes";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next/client";

export const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mutate: add, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: LoginRequst,
    onSuccess: (data) => {
      console.log(data);
      setCookie("token", data.token);

      notifications.show({
        color: "green.6",
        title: "Кіру",
        message: "Сәтті кіру",
      });

      router.push("/admin/1");
    },
    onError: (e) => {
      console.log(e, "Error");
      notifications.show({
        color: "red.6",
        title: "Кіру",
        message: "Кіру кезінде қате",
      });
    },
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    add({ username: name, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormContainer maw={"30vw"}>
        <Title order={3}>Кіру</Title>
        <TextInput
          label="Аты"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Құпия сөз"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" disabled={isPending} loading={isPending}>
          Кіру
        </Button>
      </FormContainer>
    </form>
  );
};
