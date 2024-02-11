import { enUS } from "@mui/material/locale";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useMemo } from "react";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import VIPRequestsTable from "./VIPRequestsTable";

export default function VIPRequestsPage() {
  const theme = useTheme();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: "VIP requests",
      },
    ],
    []
  );
  return (
    <PageContainer title="" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={"VIP requests"} />
      <ThemeProvider theme={createTheme(theme, enUS)}>
        <VIPRequestsTable />
      </ThemeProvider>
    </PageContainer>
  );
}
