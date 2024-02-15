import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Alert,
  useTheme,
  Chip,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Scrollbar from "@ui/custom-scroll/Scrollbar";
import Spinner from "@ui/view/spinner/Spinner";
import { useNotificationStore } from "@stores/newsStore";
import { useTranslation } from "react-i18next";
import useAuthStore from "@stores/authStore";
import { Notification, getNotifications } from "@api/user/user";
import { readNotification } from "@api/notification/notification";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import queryClient, { invalidateAllQueries } from "../../../query-client";

const NoteList = () => {
  const theme = useTheme();
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const { activeNotification, setNotification } = useNotificationStore();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["notifications", t, user?.id],
    queryFn: () => getNotifications(user?.id),
  });

  const mutation = useNotifiedMutation({
    mutationFn: readNotification,
    onSuccess: () => {
      refetch();
      invalidateAllQueries(queryClient, "unread_notifications");
    },
    showSuccessNotification: false,
  });

  const handleNotificationClicked = useCallback(
    (n: Notification) => {
      mutation.mutate({ userId: data?.userId, notificationId: n.id });
      setNotification(n);
    },
    [data?.userId, mutation, setNotification]
  );

  useEffect(() => {
    if (data && data.totalNotifications) {
      const notification = data.notifications[0];
      if (!notification.read) handleNotificationClicked(notification);
      setNotification(data.notifications[0]);
    }
  }, [data]);

  return (
    <>
      <Box p={3} px={2}>
        <TextField
          id="search"
          value={searchTerm}
          placeholder="Search Notes"
          inputProps={{ "aria-label": "Search Notes" }}
          size="small"
          type="search"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Typography variant="h6" mb={0} mt={4} pl={1}>
          {t("notification.allNotes")}
        </Typography>
      </Box>
      <Box>
        {isLoading ? (
          <Spinner />
        ) : (
          <Scrollbar
            sx={{
              height: { lg: "calc(100vh - 300px)", sm: "100vh" },
              maxHeight: "700px",
            }}
          >
            {data && data?.totalNotifications ? (
              data?.notifications
                .filter((n) => n.title.toLocaleLowerCase().includes(searchTerm))
                .map((notification) => (
                  <Box key={notification.id} px={2}>
                    <Box
                      p={2}
                      sx={{
                        position: "relative",
                        cursor: "pointer",
                        mb: 1,
                        transition: "0.1s ease-in",
                        transform:
                          activeNotification?.id === notification.id
                            ? "scale(1)"
                            : "scale(0.95)",
                        backgroundColor: theme.palette.primary.light,
                      }}
                      onClick={() => handleNotificationClicked(notification)}
                      gap={2}
                      display={"flex"}
                      flexDirection={"column"}
                    >
                      <Typography
                        variant="h6"
                        noWrap
                        color={theme.palette.primary.main}
                      >
                        {notification.title}
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="caption">
                          {new Date(
                            notification.timeCreated
                          ).toLocaleDateString()}
                        </Typography>
                        {!notification.read && (
                          <Chip
                            label={t("notification.unreadNotification")}
                            color="error"
                          />
                        )}
                      </Stack>
                    </Box>
                  </Box>
                ))
            ) : (
              <Box m={2}>
                <Alert
                  severity="error"
                  variant="filled"
                  sx={{ color: "white" }}
                >
                  {t("notification.noNotesFound")}
                </Alert>
              </Box>
            )}
          </Scrollbar>
        )}
      </Box>
    </>
  );
};

export default NoteList;
