import { enUS } from "@mui/material/locale";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useMemo } from "react";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import UserTable from "./UsersTable";

export default function UserPage() {
  const theme = useTheme();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: "Users",
      },
    ],
    []
  );
  return (
    <PageContainer title="" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={"Users"} />
      <ThemeProvider theme={createTheme(theme, enUS)}>
        <UserTable />
      </ThemeProvider>
    </PageContainer>
  );
}
