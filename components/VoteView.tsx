"use client";
import {
  Box,
  Button,
  Flex,
  Loader,
  LoadingOverlay,
  Select,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddScoreRequest,
  GetCriteriousesRequest,
  GetParticipantRequest,
} from "./shared/api/routes";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { notifications } from "@mantine/notifications";
import { queryClient } from "./shared";
import Link from "next/link";
import Script from "next/script";
import { useDisclosure } from "@mantine/hooks";

export const VoteView = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const params = useParams();
  const router = useRouter();
  const userInfo = JSON.parse(getCookie("userInfo") as string);
  const {
    data: participants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-participants"],
    queryFn: async () => {
      const data = await GetParticipantRequest();
      return data;
    },
  });
  const { data: criteriuses, isLoading: isCriteriousLoading } = useQuery({
    queryKey: ["criteriueses"],
    queryFn: async () => {
      const data = await GetCriteriousesRequest(params.id as string);
      return data;
    },
  });
  const { mutate: addScore, isPending } = useMutation({
    mutationKey: ["addScore"],
    mutationFn: AddScoreRequest,
    onSuccess: () => {},
    onError: (e) => {
      console.log(e, "Error");
    },
  });
  const [current, setCurrent] = useState(0);
  const [marks, setMarks] = useState<Record<string, Record<string, string>>>({
    "0": {},
  });
  const handlePrev = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleNext = async () => {
    try {
      const scorePromises = Object.keys(marks[current]).map((key) => {
        return addScore({
          juri_id: userInfo.id,
          participant_id: participants[current].id,
          stage: params.id as string,
          score: marks[current][key],
          criterion_id: Number(key),
        });
      });

      // Wait for all promises to resolve
      await Promise.all(scorePromises);
      queryClient.invalidateQueries({ queryKey: ["scoresTable"] });
      // Notify success
      console.log("Scores submitted successfully!");

      if (current >= participants.length - 1) {
        const stage = Number(params.id);
        if (Number(params.id) <= 2) {
          open();
          return;
        } else {
        }
      } else {
        setCurrent((prev) => prev + 1);
      }
    } catch (error) {
      // Handle any error
      console.error("Error submitting scores:", error);
    }
  };

  useEffect(() => {
    if (participants) {
      let values: typeof marks = {};
      for (let i = 0; i < participants.length; i++) {
        values[i] = {};
      }
      setMarks(values);
    }
  }, [participants]);
  if (isLoading && isCriteriousLoading)
    return (
      <LoadingOverlay
        visible={!participants}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    );
  return (
    <Flex direction={"column"} p={30} mih={"100vh"} gap={10}>
      <Flex justify={"space-between"}>
        <Title>{params.id} - кезең</Title>
        <Title>{userInfo.fullname}</Title>
      </Flex>
      <Title ta={"center"}>{participants[current].full_name}</Title>
      <Flex gap={10} wrap={"wrap"} justify={"center"} align={"center"} flex={1}>
        {!criteriuses ? (
          <Text>No criterious fetched</Text>
        ) : (
          criteriuses.map(
            (cr: { id: number; criterion: string }, idx: number) => (
              <Select
                key={current * 10 + cr.id}
                placeholder={`Выберите оценку `}
                value={marks[current][cr.id] || ""}
                onChange={(value) =>
                  setMarks((prev) => ({
                    ...prev,
                    [current]: { ...prev[current], [cr.id]: value },
                  }))
                }
                data={["1", "2", "3", "4", "5"]}
                label={`${cr.criterion}`}
              />
            ),
          )
        )}
      </Flex>
      <Flex
        p={10}
        gap={10}
        bg={"slate.1"}
        align={"center"}
        justify={"right"}
        style={{
          borderRadius: 10,
        }}
      >
        Барлығы
        <Text
          ta={"right"}
          bg={"abu"}
          c={"white"}
          px={20}
          py={10}
          span
          style={{ borderRadius: 10 }}
          fw={"bold"}
        >
          {Object.values(marks[current]).reduce(
            (acc, val) => Number(acc) + Number(val),
            0,
          )}
        </Text>
      </Flex>
      <Flex justify={"space-between"}>
        <Button disabled={current <= 0} onClick={handlePrev} variant="outline">
          Алдыңғы
        </Button>
        <Button disabled={isPending} loading={isPending} onClick={handleNext}>
          Келесі
        </Button>
      </Flex>
      <NextModal
        opened={opened}
        close={close}
        href={params.id == "1" ? "/vote/2" : "/result"}
        title={params.id == "1" ? "Келесі кезеңге өтіңіз" : "Нәтижелер"}
      />
      <Script src="/script.js" type="text/javascript" />
    </Flex>
  );
};

const NextModal = ({
  opened,
  close,
  href,
  title,
}: {
  opened: boolean;
  close: () => void;
  href: string;
  title: string;
}) => {
  return (
    <Modal opened={opened} onClose={close} title={title}>
      <Flex justify={"space-evenly"}>
        <Button onClick={close} variant="outline">
          Бас тарту
        </Button>
        <Link href={href}>
          <Button>Өту</Button>
        </Link>
      </Flex>
    </Modal>
  );
};
