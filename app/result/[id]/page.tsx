import { Box } from "@mantine/core";
import { StageResultTable } from "../../../components/StageResultTable";

type tParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: tParams }) {
  const { id } = await params;
  return (
    <Box p={30}>
      <StageResultTable stage={id} />
    </Box>
  );
}
