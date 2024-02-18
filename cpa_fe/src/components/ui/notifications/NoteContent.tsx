import React from "react";
import { Box, Divider, IconButton, Typography, Stack } from "@mui/material";
import { IconMenu2 } from "@tabler/icons-react";
import { useNotificationStore } from "@stores/newsStore";
import { useTranslation } from "react-i18next";

interface Props {
  toggleNoteSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const NoteContent = ({ toggleNoteSidebar }: Props) => {
  const { t } = useTranslation();
  const { activeNotification } = useNotificationStore();
  return (
    <Box
      sx={{
        height: { lg: "calc(100vh - 250px)", sm: "100vh" },
        maxHeight: "700px",
      }}
    >
      {/* ------------------------------------------- */}
      {/* Header Part */}
      {/* ------------------------------------------- */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <IconButton onClick={toggleNoteSidebar}>
          <IconMenu2 stroke={1.5} />
        </IconButton>
      </Box>
      <Divider />
      {/* ------------------------------------------- */}
      {/* Edit notes */}
      {/* ------------------------------------------- */}
      {activeNotification ? (
        <Box p={3}>
          <Stack direction={"row"} spacing={2}>
            <Typography
              style={{
                fontWeight: "400",
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: "0.00938em",
                color: "rgb(117, 117, 117)",
              }}
            >
              {activeNotification.title}
            </Typography>
            <Typography
              style={{
                fontWeight: "400",
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: "0.00938em",
                color: "rgb(117, 117, 117)",
              }}
            >
              |
            </Typography>
            <Typography
              style={{
                fontWeight: "400",
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: "0.00938em",
                color: "rgb(117, 117, 117)",
              }}
            >
              {activeNotification.timeCreated}
            </Typography>
          </Stack>
          <div dangerouslySetInnerHTML={{ __html: activeNotification.text }} />
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", fontSize: "24px", mt: 2 }}>
          {t("notification.selectANote")}
        </Box>
      )}
    </Box>
  );
};

export default NoteContent;
