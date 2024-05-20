import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useTranslation } from "react-i18next";
import { getBalance } from "@api/user/user";
import useAuthStore from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@ui/view/spinner/Spinner";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { InputPayment, requestPayment } from "@api/payment/payment";
import { usePaymentModalStore } from "@stores/paymentStore";

const MenuItem = ({ label, value }: any) => {
  const theme = useTheme();
  return (
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
        color={theme.palette.mode == "light" ? "secondary" : "#fff"}
      >
        {value}
      </Typography>
    </Stack>
  );
};

const AppDD = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);

  const openModal = usePaymentModalStore((state) => state.openModal);
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
    <Stack
      direction={"row"}
      gap={1}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        to="/notifications"
        component={Link}
      >
        {t("notification.title")}
      </Button> */}
      <Box>
        {lgUp ? (
          <Button
            color="inherit"
            variant="contained"
            aria-controls="msgs-menu"
            aria-haspopup="true"
            sx={{
              bgcolor: anchorEl2 ? "primary.light" : "",
              color: anchorEl2
                ? "primary.main"
                : (theme) => theme.palette.text.secondary,
              borderRadius: 8,
            }}
            onClick={handleClick2}
            startIcon={<PaidOutlinedIcon />}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {t("user.balance")}
          </Button>
        ) : (
          <IconButton
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
            onClick={handleClick2}
          >
            <PaidOutlinedIcon />
          </IconButton>
        )}
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          transformOrigin={{ horizontal: "center", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "270px",
            },
            "& .MuiMenu-paper ul": {
              p: 2,
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isBalanceLoading ? (
            <Spinner />
          ) : (
            <Stack spacing={2}>
              <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                <MenuItem
                  label={t("user.balance")}
                  value={`$${balance?.balance}`}
                />
                <Divider orientation="vertical" />
                <MenuItem label={t("user.paid")} value={`$${balance?.paid}`} />
                <Divider orientation="vertical" />
                <MenuItem
                  label={t("user.total")}
                  value={`$${balance?.total}`}
                />
                <Divider orientation="vertical" />
              </Stack>
              <Button
                color="secondary"
                style={{ color: "white" }}
                onClick={() => {
                  openModal({} as InputPayment, requestPayment, true);
                }}
                variant="contained"
              >
                {t("payments.requestPayment")}
              </Button>
            </Stack>
          )}
        </Menu>
      </Box>
      <Box>
        {lgUp ? (
          <Button
            color="inherit"
            variant="contained"
            aria-controls="msgs-menu"
            aria-haspopup="true"
            sx={{
              bgcolor: anchorEl3 ? "primary.light" : "",
              color: anchorEl3
                ? "primary.main"
                : (theme) => theme.palette.text.secondary,
              borderRadius: 8,
            }}
            onClick={handleClick3}
            startIcon={<AccountCircleOutlinedIcon />}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {t("user.manager")}
          </Button>
        ) : (
          <IconButton
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
            onClick={handleClick3}
          >
            <AccountCircleOutlinedIcon />
          </IconButton>
        )}
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
              width: "230px",
            },
            "& .MuiMenu-paper ul": {
              p: 2,
            },
          }}
        >
          <Stack direction={"column"} spacing={2}>
            <MenuItem
              label={t("user.yourManager")}
              value={user?.accountManager?.name}
            />
            <Divider />
            <MenuItem
              label={t("user.email")}
              value={user?.accountManager?.email}
            />
            <Divider />
            <MenuItem label={"Skype"} value={user?.accountManager?.skypeLink} />
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
        </Menu>
      </Box>
    </Stack>
  );
};

export default AppDD;
