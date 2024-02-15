import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Alert,
  useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import { deleteNotification } from "@api/notification/notification";
import { useQuery } from "@tanstack/react-query";
import Scrollbar from "@ui/custom-scroll/Scrollbar";
import Spinner from "@ui/view/spinner/Spinner";
import { useNotificationStore } from "@stores/newsStore";
import { IconTrash } from "@tabler/icons-react";
import queryClient, { invalidateAllQueries } from "../../../query-client";
import { getNotifications } from "@api/user/user";
import useAuthStore from "@stores/authStore";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";

const NoteList = () => {
  const { user } = useAuthStore();
  const theme = useTheme();
  const { activeNotification, setNotification } = useNotificationStore();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(user?.id ?? 0),
  });

  const deleteMutation = useNotifiedMutation({
    mutationFn: deleteNotification,
    onSuccess: () => invalidateAllQueries(queryClient, "notifications"),
  });

  useEffect(() => {
    if (data && data.totalNotifications) setNotification(data.notifications[0]);
  }, [data, setNotification]);

  return (
    <>
      <Box p={3} px={2}>
        <TextField
          id="search"
          value={searchTerm}
          placeholder="Search news"
          inputProps={{ "aria-label": "Search Notes" }}
          size="small"
          type="search"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Typography variant="h6" mb={0} mt={4} pl={1}>
          All news
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
                .filter((n: any) =>
                  n.title.toLocaleLowerCase().includes(searchTerm)
                )
                .map((notification: any) => (
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
                      onClick={() => setNotification(notification)}
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
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteMutation.mutate(notification?.id);
                            }}
                          >
                            <IconTrash width={18} />
                          </IconButton>
                        </Tooltip>
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
                  No news found
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
