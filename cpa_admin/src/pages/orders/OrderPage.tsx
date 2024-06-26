import { enUS } from "@mui/material/locale";

import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useMemo } from "react";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import OrderTable from "./OrderTable";
import { useLocation } from "react-router-dom";

export default function OrderPage() {
  const theme = useTheme();
  const { state } = useLocation();

  const BCrumb = useMemo(() => {
    const crumbs = [
      {
        to: "/",
        title: "Orders",
      },
    ];

    if (state?.companyName) {
      crumbs.push({
        to: "#",
        title: state?.companyName,
      });
    }

    return crumbs;
  }, [state?.companyName]);
  return (
    <PageContainer title="" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={"Orders"} />
      <ThemeProvider theme={createTheme(theme, enUS)}>
        <OrderTable />
      </ThemeProvider>
    </PageContainer>
  );
}
