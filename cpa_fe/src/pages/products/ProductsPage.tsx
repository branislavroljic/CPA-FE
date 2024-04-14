import { Box, Stack } from "@mui/material";
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
    <PageContainer title="Klix Lead" description="this is Shop List page">
      {/* breadcrumb */}
      <Breadcrumb title={t("products.title")} items={BCrumb} />

      {/* ------------------------------------------- */}
      {/* Left part */}
      {/* ------------------------------------------- */}
      <Stack direction={"row"}>
        <Box>
          <ProductsSidebar
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
        </Box>
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <AppCard>
          <Box p={3} flexGrow={1}  sx={{ width: "100%" }}>
            <ProductsList
              onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
            />
          </Box>
        </AppCard>
      </Stack>
    </PageContainer>
  );
};

export default ProductsPage;
