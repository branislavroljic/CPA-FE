import { enUS } from "@mui/material/locale";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useMemo } from "react";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import PaymentsTable from "./PaymentsTable";

export default function PaymentsPage() {
  const theme = useTheme();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: "Payments",
      },
    ],
    []
  );
  return (
    <PageContainer title="" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={"Plaćanja"} />
      <ThemeProvider theme={createTheme(theme, enUS)}>
        <PaymentsTable />
      </ThemeProvider>
    </PageContainer>
  );
}
