import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Flex } from "@mantine/core";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UpdateParticipantsRequest } from "./shared/api/routes";
import { queryClient } from "./shared";
import {
  ErrorNotification,
  Invalidate,
  SuccessNotification,
} from "./shared/utils";

export const AddScoreModal = ({ stage, id }: { stage: number; id: number }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState("");
  const { mutate: AddScore, isPending } = useMutation({
    mutationKey: [`addScore-stage-${stage}`],
    mutationFn: UpdateParticipantsRequest,
    onSuccess: () => {
      SuccessNotification("Нәтиже қосылды");
      Invalidate([`participants ${stage}`]);
      close();
    },
    onError: (e) => {
      ErrorNotification("Нәтиже қосылмаған");
      console.log(e, "Error");
    },
  });
  return (
    <>
      <Modal opened={opened} onClose={close} title="Есептік жазба қосу">
        <Flex p={10} gap={10} direction={"column"}>
          <TextInput
            label="Нәтиже"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={() =>
              AddScore({
                id,
                [stage == 1 ? "stage_one" : "stage_two"]: Number(value),
              })
            }
            variant="filled"
          >
            Сақтау
          </Button>
        </Flex>
      </Modal>

      <Button
        disabled={isPending}
        loading={isPending}
        variant="filled"
        onClick={open}
      >
        Өзгерту
      </Button>
    </>
  );
};
