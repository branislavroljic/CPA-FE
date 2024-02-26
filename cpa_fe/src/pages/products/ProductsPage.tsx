import { Box } from "@mui/material";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "@ui/container/PageContainer";
import AppCard from "@ui/shared/AppCard";
import ProductsSidebar from "./ProductsSidebar";
import ProductsList from "./ProductsList";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const ProductsPage = () => {
  const { t } = useTranslation();
  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: t("products.title"),
      },
    ],
    [t]
  );

  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <PageContainer title="Klixlead" description="this is Shop List page">
      {/* breadcrumb */}
      <Breadcrumb title={t("products.title")} items={BCrumb} />
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
