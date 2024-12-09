import { Flex, FlexProps } from "@mantine/core";
import { ReactNode } from "react";

export const FormContainer = ({
  children,
  ...props
}: { children: ReactNode } & FlexProps) => {
  return (
    <Flex
      miw={"40svw"}
      w={"100%"}
      p={20}
      direction={"column"}
      gap={10}
      maw={"80svw"}
      styles={{
        root: {
          borderRadius: ".5rem",
          border: "1px solid var(--mantine-color-slate-3)",
        },
      }}
      {...props}
    >
      {children}
    </Flex>
  );
};
