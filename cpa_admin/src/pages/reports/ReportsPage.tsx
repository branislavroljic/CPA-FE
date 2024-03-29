import { enUS, srRS } from "@mui/material/locale";
import i18n from "../../i18n";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useMemo } from "react";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import ReportsTable from "./ReportsTable";

export default function ReportsPage() {
  const theme = useTheme();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: "Reports",
      },
    ],
    []
  );
  return (
    <PageContainer title="" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={"Reports"} />
      <ThemeProvider
        theme={createTheme(theme, i18n.language === "en" ? enUS : srRS)}
      >
        <ReportsTable />
      </ThemeProvider>
    </PageContainer>
  );
}
