"use client";
import { Button, Textarea, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { FormContainer } from "./FormContainer";
import { AddParticipantsRequest } from "./shared/api/routes";
import { ErrorNotification, SuccessNotification } from "./shared/utils";

export const AddParticipantForm = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { mutate: add, isPending } = useMutation({
    mutationKey: ["addParticipant"],
    mutationFn: AddParticipantsRequest,
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = JSON.parse(value);
    try {
      if (!Array.isArray(data)) {
        throw new Error("Not array");
      }
      setLoading(true);

      for (const item of data) {
        add(item); // Wait for the promise to resolve
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
      }

      SuccessNotification("Added");
    } catch (e) {
      console.log(e);
      ErrorNotification("Error occurred");
    }
    setLoading(false);
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormContainer maw={"30vw"}>
        <Title order={3}>Қатысушыны тіркеу</Title>
        <Textarea
          autosize
          minRows={4}
          label="Данные JSON"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Button type="submit" disabled={loading} loading={loading}>
          Тіркеу
        </Button>
      </FormContainer>
    </form>
  );
};
