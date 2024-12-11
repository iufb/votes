import { Box } from "@mantine/core";
import { EnterResultTable } from "../../../components/EnterResultTable";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <Box p={30}>
      <EnterResultTable stage={id} />
    </Box>
  );
}
