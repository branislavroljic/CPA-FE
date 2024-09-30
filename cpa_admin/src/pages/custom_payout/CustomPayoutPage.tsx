import { enUS } from "@mui/material/locale";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useMemo } from "react";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import CustomPayoutTable from "./CutomPayoutTable";

export default function CustomPayoutPage() {
  const theme = useTheme();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: "Custom payout",
      },
    ],
    []
  );
  return (
    <PageContainer title="" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={"Custom payout"} />
      <ThemeProvider theme={createTheme(theme, enUS)}>
        <CustomPayoutTable />
      </ThemeProvider>
    </PageContainer>
  );
}
