import { Box } from "@mui/material";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "@ui/container/PageContainer";
import AppCard from "@ui/shared/AppCard";
import ProductsSidebar from "./ProductsSidebar";
import ProductsList from "./ProductsList";
import { useState } from "react";
const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Shop",
  },
];
const ProductsPage = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <PageContainer title="Shop List" description="this is Shop List page">
      {/* breadcrumb */}
      <Breadcrumb title="Ecom-Shop" items={BCrumb} />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
        <ProductsSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Box p={3} flexGrow={1}>
          <ProductsList
            onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
          />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default ProductsPage;
