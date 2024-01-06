import { enUS, srRS } from "@mui/material/locale";
import i18n from "../../i18n";
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
        title: "Narudžbine",
      },
    ],
    []
  );
  return (
    <PageContainer title="" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={"Narudžbine"} />
      <ThemeProvider
        theme={createTheme(theme, i18n.language === "en" ? enUS : srRS)}
      >
        <OrderTable />
      </ThemeProvider>
    </PageContainer>
  );
}
