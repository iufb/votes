"use client";
import { Flex, LoadingOverlay, Table, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { GetFinalScore } from "./shared/api/routes";

export function ResultTable() {
  const {
    data: res,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["resultTable"],
    queryFn: async () => {
      const data = await GetFinalScore();
      return data;
    },
  });
  if (isLoading)
    return (
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    );
  if (!res) return <Title>Не найдено</Title>;
  const rows = res.map((element: any) => (
    <Table.Tr key={element.participants}>
      <Table.Td>{element.participants}</Table.Td>
      <Table.Td>{element.scoreSum}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Flex
      direction={"column"}
      gap={20}
      p={40}
      bd={"1px solid var(--mantine-color-slate-2)"}
      style={{ borderRadius: 10 }}
    >
      <Title order={1} ta={"center"}>
        Жалпы нәтиже
      </Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Қатысушы</Table.Th>
            <Table.Th>Нәтижесі</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Flex>
  );
}
