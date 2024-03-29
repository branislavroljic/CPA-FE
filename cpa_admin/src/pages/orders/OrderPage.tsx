import { enUS } from "@mui/material/locale";

import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useMemo } from "react";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import OrderTable from "./OrderTable";

export default function OrderPage() {
  const theme = useTheme();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: "Orders",
      },
    ],
    []
  );
  return (
    <PageContainer title="" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={"Orders"} />
      <ThemeProvider theme={createTheme(theme, enUS)}>
        <OrderTable />
      </ThemeProvider>
    </PageContainer>
  );
}
