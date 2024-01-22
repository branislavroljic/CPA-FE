import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";

import { IconMail } from "@tabler/icons-react";

import ProfileImg from "/src/assets/images/profile/user-1.jpg";
import { USER_KEY } from "@api/auth";
import accountIcon from "/src/assets/images/svgs/icon-account.svg";
import i18n from "../../../../i18n";
import { useTranslation } from "react-i18next";
import useAuthStore from "@stores/authStore";

interface ProfileType {
  href: string;
  title: string;
  subtitle: string;
  icon: any;
}
const profileDropdownData: ProfileType[] = [
  {
    href: "/user-profile",
    title: i18n.t("ui.myProfile"),
    subtitle: i18n.t("ui.accountSettings"),
    icon: accountIcon,
  },
];

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { user, deleteUser } = useAuthStore((state) => state);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const { t } = useTranslation();

  const handleLogout = () => {
    {
      // localStorage.removeItem('evaluation-storage');
      // localStorage.removeItem('hardening-storage');
      // localStorage.removeItem('property-storage');
      // localStorage.removeItem('risk-storage');
      // localStorage.removeItem('threat-storage');
      // localStorage.removeItem('vulnerability-storage');
      // localStorage.removeItem('account-filter');
      deleteUser();
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(USER_KEY);
    }
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show_notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 4,
          },
        }}
      >
        <Typography variant="h5">{t("ui.userProfile")}</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={ProfileImg}
            alt={user?.username}
            sx={{ width: 95, height: 95 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              fontWeight={600}
            >
              {user?.username}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {user?.username}
            </Typography>
            <Tooltip title={user?.email} enterDelay={500}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gap={1}
                style={{ wordWrap: "break-word" }}
                // sx={{
                //   '&:hover': {
                //     display: 'inline-block',
                //   },
                // }}
              >
                <IconMail />
                {user?.email}
              </Typography>
            </Tooltip>
          </Box>
        </Stack>
        <Divider />

        <Box mt={2}>
          {/* <Box
            bgcolor="primary.light"
            p={3}
            mb={3}
            overflow="hidden"
            position="relative"
          >
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="h5" mb={2}>
                  Unlimited <br />
                  Access
                </Typography>
                <Button variant="contained" color="primary">
                  Upgrade
                </Button>
              </Box>
              <img
                src={unlimitedImg}
                alt="unlimited"
                className="signup-bg"
              ></img>
            </Box>
          </Box> */}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            fullWidth
          >
            {t("login.logout")}
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
