import { enUS, srRS } from "@mui/material/locale";
import i18n from "../../i18n";
import { Box, ThemeProvider, createTheme, useTheme } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";

export default function CompanyPage() {
  const theme = useTheme();
  const { t } = useTranslation();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: t("company.page"),
      },
    ],
    [t]
  );
  return (
    <PageContainer title="Klix Lead" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={t("company.page")} />
      <ThemeProvider
        theme={createTheme(theme, i18n.language === "en" ? enUS : srRS)}
      >
        <Box>Kako ide posao</Box>
        {/* <Button ></Button> */}
      </ThemeProvider>
    </PageContainer>
  );
}
