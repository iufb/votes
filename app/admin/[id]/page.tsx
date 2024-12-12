import { Box } from "@mantine/core";
import { EnterResultTable } from "../../../components/EnterResultTable";

type tParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: tParams }) {
  const { id } = await params;

  return (
    <Box p={30}>
      <EnterResultTable stage={id} />
    </Box>
  );
}
