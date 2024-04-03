import { useMemo, useState } from "react";
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
  Snackbar,
} from "@mui/material";

import { IconMail } from "@tabler/icons-react";

import ProfileImg from "/src/assets/images/profile/user-1.jpg";
import { USER_KEY } from "@api/auth";
import accountIcon from "/src/assets/images/svgs/icon-account.svg";
import { useTranslation } from "react-i18next";
import useAuthStore from "@stores/authStore";
import { ContentCopy } from "@mui/icons-material";

interface CopyToClipboardButtonProps {
  textToCopy: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  textToCopy,
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <ContentCopy color="primary" />
      </IconButton>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </>
  );
};

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { user, deleteUser } = useAuthStore((state) => state);
  const { t } = useTranslation();

  const profileDropdownData = useMemo(
    () => [
      {
        href: "/user-profile",
        title: t("ui.myProfile"),
        subtitle: t("ui.accountSettings"),
        icon: accountIcon,
      },
    ],
    [t]
  );

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

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
              {`${user?.name} ${user?.surname}`}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {user?.username}
            </Typography>
            <Tooltip title={user?.email} enterDelay={500}>
              <Typography
                variant="caption"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gap={1}
                style={{ wordWrap: "break-word" }}
              >
                <IconMail />
                {user?.email}
              </Typography>
            </Tooltip>
          </Box>
        </Stack>
        <Divider />
        {profileDropdownData.map((profile) => (
          <Box key={profile.title}>
            <Box key={"referral_text"}>
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color="textPrimary"
                  className="text-hover"
                  noWrap
                  sx={{
                    width: "240px",
                  }}
                >
                  {t("user.referralTitle")}
                </Typography>
                <Typography
                  component={"div"}
                  color="textSecondary"
                  variant="subtitle2"
                  sx={{
                    flex: 1,
                  }}
                  noWrap
                >
                  {t("user.referralDesc")}

                  <Box fontWeight="900" display="inline">
                    {` 5% `}
                  </Box>

                  {t("user.referralFees")}
                </Typography>
              </Box>
            </Box>
            <Box key={t("user.referralLink")}>
              <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                <Stack direction="row" spacing={2}>
                  <Box
                    width="45px"
                    height="45px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <CopyToClipboardButton
                      textToCopy={user?.referrerLink ?? ""}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="textPrimary"
                      className="text-hover"
                      noWrap
                      sx={{
                        width: "240px",
                      }}
                    >
                      {t("user.referralLink")}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: "240px",
                      }}
                      noWrap
                    >
                      {user?.referrerLink}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
              <Link to={profile.href}>
                <Stack direction="row" spacing={2}>
                  <Box
                    width="45px"
                    height="45px"
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      src={profile.icon}
                      alt={profile.icon}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="textPrimary"
                      className="text-hover"
                      noWrap
                      sx={{
                        width: "240px",
                      }}
                    >
                      {profile.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: "240px",
                      }}
                      noWrap
                    >
                      {profile.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))}

        <Box mt={2}>
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
