import { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const AppDD = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
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
        Notifications
      </Button>
      <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        to="/apps/calendar"
        component={Link}
      >
        Calendar
      </Button>
      <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        to="/apps/email"
        component={Link}
      >
        Email
      </Button>
    </>
  );
};

export default AppDD;
