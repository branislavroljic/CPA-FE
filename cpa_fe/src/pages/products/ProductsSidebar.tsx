
import { Drawer, Theme, useMediaQuery } from "@mui/material";
import ProductsFilter from "./ProductsFilter";

const drawerWidth = 250;

interface Props {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.SyntheticEvent | Event) => void;
}

const ProductsSidebar = ({ isMobileSidebarOpen, onSidebarClose }: Props) => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  return (
    <Drawer
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant={lgUp ? "permanent" : "temporary"}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: lgUp ? 0 : 1,
        [`& .MuiDrawer-paper`]: { position: "relative" },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Filter Sidebar */}
      {/* ------------------------------------------- */}
      <ProductsFilter />
    </Drawer>
  );
};

export default ProductsSidebar;
