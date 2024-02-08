import { enUS, srRS } from "@mui/material/locale";
import i18n from "../../i18n";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useMemo } from "react";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import CategoryTable from "./CategoryTable";

export default function CategoryPage() {
  const theme = useTheme();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: "Categories",
      },
    ],
    []
  );
  return (
    <PageContainer title="" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={"Categories"} />
      <ThemeProvider theme={createTheme(theme, enUS)}>
        <CategoryTable />
      </ThemeProvider>
    </PageContainer>
  );
}
