import { enUS, srRS } from "@mui/material/locale";
import i18n from "../../i18n";
import {
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import LoginHistoryTable from "./LoginHistoryTable";
import StatisticsCard from "@ui/shared/StatisticsCard";
import AdsClickIcon from "@mui/icons-material/AdsClick";

export default function LoginHistoryPage() {
  const theme = useTheme();
  const { t } = useTranslation();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: t("loginHistory.title"),
      },
    ],
    [t]
  );
  return (
    <PageContainer title="" description="this is innerpage">
      <Breadcrumb items={BCrumb} title={t("loginHistory.title")} />
      <ThemeProvider
        theme={createTheme(theme, i18n.language === "en" ? enUS : srRS)}
      >
        <StatisticsCard
          title={"naslov"}
          item={{ today: 0.3, yesterday: 0.2, thisWeek: 0.2, thisMonth: 0.6 }}
          icon={<AdsClickIcon />}
        ></StatisticsCard>
        <LoginHistoryTable />
      </ThemeProvider>
    </PageContainer>
  );
}
