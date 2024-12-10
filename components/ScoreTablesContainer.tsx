"use client";
import { useQuery } from "@tanstack/react-query";
import { GetParticipantsScore } from "./shared/api/routes";
import { LoadingOverlay, Title } from "@mantine/core";
import { ScoreTable } from "./ScoreTable";

export const ScoreTablesContainer = ({ stage }: { stage: string }) => {
  const {
    data: scores,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scoresTable"],
    queryFn: async () => {
      const data = await GetParticipantsScore(stage);
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
  console.log(scores);

  if (!scores) return <Title>Не найдено</Title>;
  return scores.map((s: any, idx: number) => <ScoreTable key={idx} res={s} />);
};
