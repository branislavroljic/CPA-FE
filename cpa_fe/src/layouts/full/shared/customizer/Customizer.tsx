import { FC, useState } from "react";
import {
  Drawer,
  Divider,
  styled,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import { IconX, IconSettings } from "@tabler/icons-react";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import Scrollbar from "@ui/custom-scroll/Scrollbar";
import { useCustomizerStore } from "@stores/customizerStore";
import { useTranslation } from "react-i18next";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

const SidebarWidth = "320px";
const Customizer: FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const customizer = useCustomizerStore();
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  // const open = Boolean(anchorEl);

  const handleClick = () => {
    setShowDrawer(true);
  };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const dispatch = useDispatch();

  const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    boxShadow: theme.shadows[8],
    padding: "20px",
    cursor: "pointer",
    justifyContent: "center",
    display: "flex",
    transition: "0.1s ease-in",
    border: "1px solid rgba(145, 158, 171, 0.12)",
    "&:hover": {
      transform: "scale(1.05)",
    },
  }));

  return (
    <div>
      {/* ------------------------------------------- */}
      {/* --Floating Button to open customizer ------ */}
      {/* ------------------------------------------- */}
      {/* <Tooltip title="Settings">
        <Fab
          color="primary"
          aria-label="settings"
          sx={{ position: 'fixed', right: '25px', bottom: '15px' }}
          onClick={() => setShowDrawer(true)}
        >
          <IconSettings />
        </Fab>
      </Tooltip> */}
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {customizer.activeMode === "light" ? (
          <DarkModeIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {/* ------------------------------------------- */}
        {/* ------------ Customizer Sidebar ------------- */}
        {/* ------------------------------------------- */}
        <Scrollbar sx={{ height: "calc(100vh - 5px)" }}>
          <Box
            p={2}
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Typography variant="h4">{t("ui.settings")}</Typography>

            <IconButton color="inherit" onClick={() => setShowDrawer(false)}>
              <IconX />
            </IconButton>
          </Box>
          <Divider />
          <Box p={3}>
            {/* ------------------------------------------- */}
            {/* ------------ Dark light theme setting ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant="h6" gutterBottom>
              {t("ui.themeOption")}
            </Typography>
            <Stack direction={"row"} gap={2} my={2}>
              <StyledBox
                onClick={() => customizer.setDarkMode("light")}
                display="flex"
                gap={1}
              >
                <WbSunnyTwoToneIcon
                  color={
                    customizer.activeMode === "light" ? "primary" : "inherit"
                  }
                />
                Light
              </StyledBox>
              <StyledBox
                onClick={() => customizer.setDarkMode("dark")}
                display="flex"
                gap={1}
              >
                <DarkModeTwoToneIcon
                  color={
                    customizer.activeMode === "dark" ? "primary" : "inherit"
                  }
                />
                Dark
              </StyledBox>
            </Stack>
          </Box>
        </Scrollbar>
      </Drawer>
    </div>
  );
};

export default Customizer;
