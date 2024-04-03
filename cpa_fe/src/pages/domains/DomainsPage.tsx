import { enUS, srRS } from "@mui/material/locale";
import i18n from "../../i18n";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import DomainsTable from "./DomainsTable";

export default function DomainsPage() {
  const theme = useTheme();
  const { t } = useTranslation();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: t("domain.title"),
      },
    ],
    [t]
  );
  return (
    <PageContainer title="Klix Lead" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={t("payments.title")} />
      <ThemeProvider
        theme={createTheme(theme, i18n.language === "en" ? enUS : srRS)}
      >
        <DomainsTable />
      </ThemeProvider>
    </PageContainer>
  );
}
