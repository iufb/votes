"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  GetCount,
  GetParticipantsRequest,
  SetCount,
  UpdateParticipantsRequest,
} from "./shared/api/routes";
import {
  Button,
  Flex,
  LoadingOverlay,
  Modal,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { ParticipantType } from "./shared/types";
import { AddScoreModal } from "./AddScoreModal";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import {
  SuccessNotification,
  Invalidate,
  ErrorNotification,
} from "./shared/utils";
import { useRouter } from "next/navigation";
import { isPrerenderInterruptedError } from "next/dist/server/app-render/dynamic-rendering";

export const EnterResultTable = ({ stage }: { stage: string }) => {
  const {
    data: participants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`participants`],
    queryFn: async () => {
      const data: ParticipantType[] = await GetParticipantsRequest();
      if (stage == "2") {
        const { count } = (await GetCount())[0];
        console.log(count);

        return data.sort((a, b) => b.stage_one - a.stage_one).slice(0, count);
      }
      return data;
    },
  });
  if (isLoading)
    return (
      <LoadingOverlay
        visible={!participants}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    );
  if (!participants || participants.length == 0)
    return <Title>Не найдены</Title>;

  const rows = participants.map((participant, idx) => (
    <Table.Tr key={participant.id}>
      <Table.Td>{idx + 1}</Table.Td>
      <Table.Td>{participant.full_name}</Table.Td>
      <Table.Td>{participant.place_of_study ?? "-"}</Table.Td>
      <Table.Td>{participant.teacher_full_name}</Table.Td>
      <Table.Td>{participant.teacher_phone}</Table.Td>
      <Table.Td>
        <Flex maw={150} gap={5} align={"center"} justify={"space-between"}>
          <Text
            miw={42}
            bg={"abu"}
            c={"white"}
            ta={"center"}
            p={7}
            fw={"bold"}
            style={{ borderRadius: 4 }}
          >
            {participant.stage_one ? participant.stage_one : 0}
          </Text>
          <AddScoreModal stage={1} id={participant.id} />
        </Flex>
      </Table.Td>
      {stage == "2" && (
        <Table.Td>
          <Flex maw={150} gap={5} align={"center"} justify={"space-between"}>
            <Text
              miw={42}
              bg={"abu"}
              c={"white"}
              ta={"center"}
              p={7}
              fw={"bold"}
              style={{ borderRadius: 4 }}
            >
              {participant.stage_two ? participant.stage_two : 0}
            </Text>
            <AddScoreModal stage={2} id={participant.id} />
          </Flex>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <Flex gap={10} direction={"column"} p={10}>
      <Flex justify={"space-between"}>
        <Title order={2}>Қатысушылар</Title>
        {stage == "1" && <EnterCountForSecondStageModal />}
      </Flex>
      <Table withTableBorder highlightOnHover withColumnBorders striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>№</Table.Th>
            <Table.Th>Аты жөні</Table.Th>
            <Table.Th>Оқу орны</Table.Th>
            <Table.Th>Мұғалімнің аты-жөні</Table.Th>
            <Table.Th>Мұғалімнің нөмірі</Table.Th>
            <Table.Th>1 кезең</Table.Th>
            {stage == "2" && <Table.Th>2 кезең</Table.Th>}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Flex>
  );
};

const EnterCountForSecondStageModal = () => {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState("");
  const { mutate: toSecond, isPending } = useMutation({
    mutationKey: [`to-second`],
    mutationFn: SetCount,
    onSuccess: () => {
      Invalidate([`participant 2`]);
      router.push("/admin/2");
    },
    onError: (e) => {
      ErrorNotification("Ошибка");
      console.log(e, "Error");
    },
  });
  return (
    <>
      <Modal opened={opened} onClose={close} title="Қатысушылар санын орнату">
        <Flex p={10} gap={10} direction={"column"}>
          <TextInput
            label="Қатысушылар саны"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            disabled={isPending}
            loading={isPending}
            onClick={() => toSecond(value)}
            variant="filled"
          >
            Сақтау
          </Button>
        </Flex>
      </Modal>
      <Button variant="filled" onClick={open}>
        Қатысушылар санын орнату
      </Button>
    </>
  );
};
