"use client";
import { Flex, Table, Text, Title } from "@mantine/core";
import { Fragment } from "react";

export const ScoreTable = ({ res }: { res: typeof data }) => {
  const jurorNames = Array.from(
    new Set(
      res.criteries.flatMap((criteria) => criteria.scores.map((s) => s.jury)),
    ),
  );

  // Generate table headers
  const headers = (
    <Table.Tr>
      <Table.Th>Критерий</Table.Th>
      {jurorNames.map((jury, index) => (
        <Table.Th key={index}>{jury}</Table.Th>
      ))}
    </Table.Tr>
  );

  // Generate table rows
  const rows = res.criteries.map((criteria, index) => (
    <Table.Tr key={index}>
      <Table.Td>{criteria.name}</Table.Td>
      {jurorNames.map((jury, jurorIndex) => {
        const score =
          criteria.scores.find((s) => s.jury === jury)?.score || "-";
        return <Table.Td key={jurorIndex}>{score}</Table.Td>;
      })}
    </Table.Tr>
  ));

  return (
    <Flex
      p={40}
      direction={"column"}
      bd={"1px solid var(--mantine-color-slate-2)"}
      style={{ borderRadius: 10 }}
    >
      <Title order={3}>{res.participants}</Title>
      <Table>
        <Table.Thead>{headers}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Text ta={"end"}>Жалпы балл : {res.scoreSum}</Text>
    </Flex>
  );
};

const data = {
  participants: "fd",
  criteries: [
    {
      name: "Критерий 1",
      scores: [
        { jury: "Sudya Dva", score: 1 },
        { jury: "Sudya Odin", score: 2 },
      ],
    },
    {
      name: "Критерий 2",
      scores: [
        { jury: "Sudya Dva", score: 2 },
        { jury: "Sudya Odin", score: 3 },
      ],
    },
  ],
  scoreSum: 10,
};
