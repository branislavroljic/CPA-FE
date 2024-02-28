import {
  IconButton,
  Box,
  AppBar,
  useMediaQuery,
  Toolbar,
  styled,
  Stack,
  Button,
} from "@mui/material";

import { IconBellRinging, IconMenu2 } from "@tabler/icons-react";
import Profile from "./Profile";
import Search from "./Search";
import { useCustomizerStore } from "@stores/customizerStore";
import Customizer from "@layout/full/shared/customizer/Customizer";
import { Link } from "react-router-dom";

const Header = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  // drawer
  const customizer = useCustomizerStore();
  // const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={
            lgUp
              ? () => customizer.toggleSidebar()
              : () => customizer.toggleMobileSidebar()
          }
        >
          <IconMenu2 size="20" />
        </IconButton>

        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />
        {lgUp ? <>{/* <Navigation /> */}</> : null}

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton
            size="large"
            aria-label="show 11 new notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
            sx={{
              color: "text.secondary",
            }}
            to="/notifications"
            component={Link}
          >
            <IconBellRinging size="21" stroke="1.5" />
          </IconButton>
          {/* <Language /> */}
          {/* ------------------------------------------- */}
          {/* Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Cart /> */}
          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Notifications /> */}
          {/* ------------------------------------------- */}
          {/* Toggle Right Sidebar for mobile */}
          {/* ------------------------------------------- */}

          {/* {lgDown ? <MobileRightSidebar /> : null} */}
          <Profile />
          <Customizer />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
