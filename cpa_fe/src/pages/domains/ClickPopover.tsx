import React, { useMemo } from "react";
import { Popover, Typography, Box, IconButton } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { useTranslation } from "react-i18next";

const ClickPopover = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const parkDomainSteps = useMemo(
    () => [
      t("domain.step1"),
      t("domain.step2"),
      t("domain.step3"),
      t("domain.step4"),
      t("domain.step5"),
    ],
    [t]
  );

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
        <Box p={3}>
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
