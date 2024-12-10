import { Flex, Title } from "@mantine/core";
import { ScoreTablesContainer } from "../../../components/ScoreTablesContainer";

export default async function VotePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <Flex direction={"column"} gap={30} p={30}>
      <Title ta={"center"}>{id} кезең бойынша жалпы қорытынды</Title>
      <ScoreTablesContainer stage={id} />
    </Flex>
  );
}
