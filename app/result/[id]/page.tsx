import { Box } from "@mantine/core";
import { StageResultTable } from "../../../components/StageResultTable";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <Box p={30}>
      <StageResultTable stage={id} />
    </Box>
  );
}
