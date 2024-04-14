import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import FlagEn from "/src/assets/images/flag/icon-flag-en.svg";
import FlagBs from "/src/assets/images/flag/icon-flag-bs.svg";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useCustomizerStore } from "@stores/customizerStore";
import React from "react";
import queryClient from "../../../../query-client";

const Languages = [
  {
    flagname: "Srpski",
    icon: FlagBs,
    value: "bs",
  },
  {
    flagname: "English (UK)",
    icon: FlagEn,
    value: "en",
  },
];

const Language = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const customizer = useCustomizerStore();
  const currentLang =
    Languages.find((_lang) => _lang.value === customizer.isLanguage) ||
    Languages[1];
  const { i18n } = useTranslation();
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    i18n.changeLanguage(customizer.isLanguage);
    // queryClient.clear();
  }, [customizer.isLanguage, i18n]);

  // useEffect(() => {
  //   console.log("bio sam tu");
  //   queryClient.clear();
  // }, [i18n]);

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar
          src={currentLang.icon}
          alt={currentLang.value}
          sx={{ width: 20, height: 20 }}
        />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        {Languages.map((option, index) => (
          <MenuItem
            key={index}
            sx={{ py: 2, px: 3 }}
            onClick={() => {
              customizer.setLanguage(option.value);
              // setTimeout(() => {
              //   window.location.reload();
              // }, 1500);
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                src={option.icon}
                alt={option.icon}
                sx={{ width: 20, height: 20 }}
              />
              <Typography> {option.flagname}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Language;
