import React from "react";
import { Popover, Typography, Box, IconButton } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const parkDomainSteps = [
  i18n.t("domain.howToParkDomain"),
  i18n.t("domain.howToParkDomain"),
  i18n.t("domain.howToParkDomain"),
  i18n.t("domain.howToParkDomain"),
  i18n.t("domain.howToParkDomain"),
];
const ClickPopover = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <HelpOutlineOutlinedIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <Typography variant="h6" mb={1}>
            {t("domain.howToParkDomain")}
          </Typography>
          {parkDomainSteps.map((step, index) => (
            <Typography color="textSecondary">
              {`${index + 1}. ${step}`}
            </Typography>
          ))}
        </Box>
      </Popover>
    </>
  );
};
export default ClickPopover;
