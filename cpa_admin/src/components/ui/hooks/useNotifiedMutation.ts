import { useNotificationStore } from "@stores/notificationStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";

export type ErrorMessage = {
  message: string;
  stackTrace?: string;
};

export interface NotifiedMutationOptions<T> {
  mutationFn: ((input: T) => Promise<AxiosResponse<any, any>>) | undefined;
  onSuccess?: (response: AxiosResponse<any, any>, input: T) => void;
  showSuccessNotification?: boolean;
}

export default function useNotifiedMutation<T>(
  options: NotifiedMutationOptions<T>
) {
  const openNotification = useNotificationStore(
    (state) => state.openNotification
  );

  const {
    mutationFn,
    onSuccess,
    showSuccessNotification: showSuccessMutation,
  } = options;

  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: async (response, input) => {
      if (response.status >= 300) {
        const body = await response.data;

        const message = body as ErrorMessage;

        if (import.meta.env.DEV && message.stackTrace) {
          console.log(message.stackTrace);
        }

        openNotification({
          isError: true,
          primaryText: t("util.errorOccurred"),
          secondaryText: message.message,
        });

        return;
      }

      if (showSuccessMutation) {
        openNotification({
          isError: false,
          primaryText: t("util.success"),
          secondaryText: t("util.persistSuccess"),
        });
      }

      if (onSuccess) {
        onSuccess(response, input);
      }
    },
    onError: (error: AxiosError) => {
      openNotification({
        isError: true,
        primaryText: t("util.errorOccurred"),
        secondaryText: error.response?.data as string,
      });
    },
  });

  return mutation;
}
