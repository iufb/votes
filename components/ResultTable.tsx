"use client";
import { LoadingOverlay, Title, Table, Flex, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AddScoreModal } from "./AddScoreModal";
import { GetCount, GetParticipantsRequest } from "./shared/api/routes";
import { ParticipantType } from "./shared/types";

export const ResultTable = () => {
  const {
    data: participants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["participants"],
    queryFn: async () => {
      const data: ParticipantType[] = await GetParticipantsRequest();
      const { count } = (await GetCount())[0];

      return data
        .sort((a, b) => b.stage_one + b.stage_two - (a.stage_one + a.stage_two))
        .slice(0, count);
    },
    refetchInterval: 3000,
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
      {/* <Table.Td>{participant.place_of_study}</Table.Td> */}
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
            {participant.stage_one + participant.stage_two}
          </Text>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Flex gap={10} direction={"column"} p={10}>
      <Title ta={"center"} order={1}>
        Қатысушылар
      </Title>
      <Table
        withTableBorder
        highlightOnHover
        withColumnBorders
        striped
        style={{ fontSize: "1.5rem" }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Орны</Table.Th>
            <Table.Th>Аты жөні</Table.Th>
            {/* <Table.Th>Оқу орны</Table.Th> */}
            <Table.Th>Нәтиже</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Flex>
  );
};
