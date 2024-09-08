import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Stack,
  Link,
} from "@mui/material";
import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from "@mui/icons-material/Link";

const Links = [
  {
    name: "Facebook",
    icon: FacebookOutlinedIcon,
    value: "https://www.facebook.com/klixlead",
  },
  {
    name: "Telegram",
    icon: TelegramIcon,
    value: "https://t.me/klixmare",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    value: "https://www.instagram.com/klixlead.network",
  },
  {
    name: "LinkedIn",
    icon: LinkedInIcon,
    value: "https://www.linkedin.com/company/klixlead/",
  },
];

const  SocialMediaLinks = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <LinkIcon />
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
        {Links.map((option, index) => (
          <MenuItem
            key={index}
            sx={{ py: 2, px: 3 }}
            // onClick={() => customizer.setLanguage(option.value)}
          >
            <Link href={option.value} underline="hover" color={"black"}>
              <Stack direction="row" spacing={2} alignItems="center">
                <option.icon />
                <Typography> {option.name}</Typography>
              </Stack>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SocialMediaLinks;
