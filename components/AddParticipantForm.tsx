"use client";
import { Button, TextInput, Title } from "@mantine/core";
import { FormEvent, useState } from "react";
import { FormContainer } from "./FormContainer";
import { useMutation } from "@tanstack/react-query";
import { AddParticipantRequest } from "./shared/api/routes";
import { notifications } from "@mantine/notifications";

export const AddParticipantForm = () => {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [teacherData, setTeacherData] = useState({
    teacher_full_name: "",
    teacher_phone: "",
  });
  const { mutate: add, isPending } = useMutation({
    mutationKey: ["addParticipant"],
    mutationFn: AddParticipantRequest,
    onSuccess: () => {
      notifications.show({
        color: "green.6",
        title: "Қатысушыны тіркеу",
        message: "Қатысушы сәтті қосылды",
      });
      setName("");
      setPlace("");
      setTeacherData({
        teacher_full_name: "",
        teacher_phone: "",
      });
    },
    onError: (e) => {
      console.log(e, "Error");
      notifications.show({
        color: "red.6",
        title: "Қатысушыны тіркеу",
        message: "Қосу кезінде қате",
      });
    },
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    add({ full_name: name, place_of_study: place, ...teacherData });
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormContainer maw={"30vw"}>
        <Title order={3}>Қатысушыны тіркеу</Title>
        <TextInput
          label="ФИО"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Оқу орны"
          required
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <TextInput
          label="Мұғалімнің аты"
          required
          value={teacherData.teacher_full_name}
          onChange={(e) =>
            setTeacherData({
              ...teacherData,
              teacher_full_name: e.target.value,
            })
          }
        />
        <TextInput
          label="Мұғалімнің телефоны"
          required
          type="number"
          value={teacherData.teacher_phone}
          onChange={(e) =>
            setTeacherData({ ...teacherData, teacher_phone: e.target.value })
          }
        />

        <Button type="submit" disabled={isPending} loading={isPending}>
          Тіркеу
        </Button>
      </FormContainer>
    </form>
  );
};
