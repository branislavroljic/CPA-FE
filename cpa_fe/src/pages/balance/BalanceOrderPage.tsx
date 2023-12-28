import { enUS, srRS } from "@mui/material/locale";
import i18n from "../../i18n";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import BalanceOrderTable from "./BalanceOrderTable";

export default function BalanceOrderPage() {
  const theme = useTheme();
  const { t } = useTranslation();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: t("order.balanceTitle"),
      },
    ],
    [t]
  );
  return (
    <PageContainer title="" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={t("order.balanceTitle")} />
      <ThemeProvider
        theme={createTheme(theme, i18n.language === "en" ? enUS : srRS)}
      >
        <BalanceOrderTable />
      </ThemeProvider>
    </PageContainer>
  );
}
