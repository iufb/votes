import { notifications } from "@mantine/notifications";
import { queryClient } from ".";

export const Invalidate = (key: string[]) => {
  queryClient.invalidateQueries({ queryKey: key });
};
export const SuccessNotification = (message: string) => {
  notifications.show({
    title: "Сәтті",
    message,
    color: "green",
  });
};
export const ErrorNotification = (message: string) => {
  notifications.show({
    title: "Қате",
    message,
    color: "red",
  });
};
