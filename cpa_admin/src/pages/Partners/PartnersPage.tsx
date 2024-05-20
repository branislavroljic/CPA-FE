import { enUS } from "@mui/material/locale";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useMemo } from "react";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import UserTable from "./PartnersTable";
export default function PartnersPage() {
  const theme = useTheme();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: "Partners",
      },
    ],
    []
  );
  return (
    <PageContainer title="" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={"Partners"} />
      <ThemeProvider theme={createTheme(theme, enUS)}>
        <UserTable />
      </ThemeProvider>
    </PageContainer>
  );
}
