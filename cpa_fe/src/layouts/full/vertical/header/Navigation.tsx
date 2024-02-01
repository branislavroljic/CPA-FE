import { useState } from "react";
import { Box, Button, Divider, Menu, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useTranslation } from "react-i18next";
import { getBalance } from "@api/user/user";
import useAuthStore from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@ui/view/spinner/Spinner";

const MenuItem = ({ label, value }: any) => (
  <Stack>
    <Typography
      style={{
        fontWeight: "400",
        fontSize: "1rem",
        lineHeight: "1.5",
        letterSpacing: "0.00938em",
        textAlign: "left",
      }}
      color="primary"
    >
      {label}
    </Typography>
    <Typography
      style={{
        fontWeight: "700",
        fontSize: "1rem",
        lineHeight: "1.5",
        letterSpacing: "0.00938em",
        textAlign: "left",
        marginTop: "8px",
      }}
      color="secondary"
    >
      {value}
    </Typography>
  </Stack>
);

const AppDD = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);

  const { data: balance, isLoading: isBalanceLoading } = useQuery({
    queryKey: ["balance", user?.id],
    queryFn: () => getBalance(user?.id),
  });

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleClick3 = (event: any) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  return (
    <>
      <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        to="/notifications"
        component={Link}
      >
        {t("notification.title")}
      </Button>
      <Box>
        <Button
          color="inherit"
          variant="text"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            bgcolor: anchorEl2 ? "primary.light" : "",
            color: anchorEl2
              ? "primary.main"
              : (theme) => theme.palette.text.secondary,
          }}
          onClick={handleClick2}
          startIcon={<PaidOutlinedIcon />}
        >
          {t("user.balance")}
        </Button>
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "170px",
            },
            "& .MuiMenu-paper ul": {
              p: 2,
            },
          }}
        >
          {isBalanceLoading ? (
            <Spinner />
          ) : (
            <Stack direction={"column"} spacing={2}>
              <MenuItem
                label={t("user.balance")}
                value={`$${balance?.balance}`}
              />
              <Divider />
              <MenuItem label={t("user.paid")} value={`$${balance?.paid}`} />
            </Stack>
          )}
        </Menu>
      </Box>
      <Box>
        <Button
          color="inherit"
          variant="text"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            bgcolor: anchorEl3 ? "primary.light" : "",
            color: anchorEl3
              ? "primary.main"
              : (theme) => theme.palette.text.secondary,
          }}
          onClick={handleClick3}
          startIcon={<AccountCircleOutlinedIcon />}
        >
          {t("user.manager")}
        </Button>
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl3}
          keepMounted
          open={Boolean(anchorEl3)}
          onClose={handleClose3}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "170px",
            },
            "& .MuiMenu-paper ul": {
              p: 2,
            },
          }}
        >
          {isBalanceLoading ? (
            <Spinner />
          ) : (
            <Stack direction={"column"} spacing={2}>
              <MenuItem
                label={t("user.firstname")}
                value={user?.accountManager?.name}
              />
              <Divider />
              <MenuItem
                label={t("user.email")}
                value={user?.accountManager?.email}
              />
              <Divider />
              <MenuItem
                label={"Skype"}
                value={user?.accountManager?.skypeLink}
              />
              <Divider />
              <MenuItem
                label={"Telegram"}
                value={user?.accountManager?.telegramLink}
              />
              <Divider />
              <MenuItem
                label={"Whatsapp"}
                value={user?.accountManager?.whatsappLink}
              />
              <Divider />
            </Stack>
          )}
        </Menu>
      </Box>
    </>
  );
};

export default AppDD;
