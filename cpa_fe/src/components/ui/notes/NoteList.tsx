import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Alert,
  useTheme,
} from "@mui/material";
import { getNotifications } from "@api/notification/notification";
import { useQuery } from "@tanstack/react-query";
import Scrollbar from "@ui/custom-scroll/Scrollbar";
import Spinner from "@ui/view/spinner/Spinner";
import { useNotificationStore } from "@stores/notificationStore";

const NoteList = () => {
  const theme = useTheme();
  const { activeNotification, setNotification } = useNotificationStore();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });

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
          All Notes
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
            {data && data.length ? (
              data
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
                  No Notes Found!
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
