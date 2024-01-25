import { useMemo } from "react";
import { Box, CircularProgress, Grid, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@stores/authStore";
import PageContainer from "@ui/container/PageContainer";
import TopCards from "@ui/dashboard/TopCards";
import { useTranslation } from "react-i18next";
import {
  getConversionRateStatistics,
  getConversionStatistics,
  getDashboardData,
  getHoldStatistics,
  getRevenueStatistics,
} from "@api/user/user";

import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import PercentIcon from "@mui/icons-material/Percent";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { StatisticsCardProps } from "@ui/shared/StatisticsCard";
import WelcomeCard from "./WelcomeCard";
import AreaChart, { AreaChartProp } from "@ui/dashboard/AreaChart";

export interface BarChartProps {
  title: string;
  subtitle: string;
  dataLabel1: string;
  dataLabel2: string;
  dataItem1: string;
  dataItem2: string;
  data: Report[];
}

export default function StatisticsPage() {
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation();

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const success = theme.palette.success.main;
  const info = theme.palette.info.main;

  const { data: dashboardData, isLoading: isDashboardDataLoading } = useQuery({
    queryKey: ["dashboard", user?.id],
    queryFn: () => getDashboardData(user?.id),
  });

  const { data: revenueData, isLoading: isRevenueLoading } = useQuery({
    queryKey: ["revenue_statistics", user?.id],
    queryFn: () => getRevenueStatistics(user?.id),
  });

  const { data: holdData, isLoading: isHoldLoading } = useQuery({
    queryKey: ["hold_statistics", user?.id],
    queryFn: () => getHoldStatistics(user?.id),
  });

  const { data: conversionRateData, isLoading: isConversionRateLoading } =
    useQuery({
      queryKey: ["conversion_rate_statistics", user?.id],
      queryFn: () => getConversionRateStatistics(user?.id),
    });

  const { data: conversionData, isLoading: isConversionLoading } = useQuery({
    queryKey: ["conversion_statistics", user?.id],
    queryFn: () => getConversionStatistics(user?.id),
  });

  const dashboardStatisticsData = useMemo(() => {
    return [
      {
        icon: <RefreshRoundedIcon />,
        title: t("statistics.conversion"),
        item: {
          today: `${dashboardData?.conversionsToday}`,
          yesterday: `${dashboardData?.conversionsYesterday}`,
          thisWeek: `${dashboardData?.conversionsThisWeek}`,
          thisMonth: `${dashboardData?.conversionsThisMonth}`,
        },
        percentage: dashboardData?.conversionsPercentage,
      },
      {
        icon: <PercentIcon />,
        title: t("statistics.conversionRate"),
        item: {
          today: `${dashboardData?.conversionRateToday.toFixed(2)}%`,
          yesterday: `${dashboardData?.conversionRateYesterday.toFixed(2)}%`,
          thisWeek: `${dashboardData?.conversionRateThisWeek.toFixed(2)}%`,
          thisMonth: `${dashboardData?.conversionRateThisMonth.toFixed(2)}%`,
        },
        percentage: dashboardData?.conversionRatePercentage,
      },
      {
        icon: <PauseRoundedIcon />,
        title: t("statistics.requested"),
        item: {
          today: dashboardData?.requestedToday,
          yesterday: dashboardData?.requestedYesterday,
          thisWeek: dashboardData?.requestedThisWeek,
          thisMonth: dashboardData?.requestedThisMonth,
        },
        percentage: dashboardData?.requestedPercentage,
      },
      {
        icon: <LocalAtmOutlinedIcon />,
        title: t("statistics.revenue"),
        item: {
          today: `$${dashboardData?.revenueToday}`,
          yesterday: `$${dashboardData?.revenueYesterday}`,
          thisWeek: `$${dashboardData?.revenueThisWeek}`,
          thisMonth: `$${dashboardData?.revenueThisMonth}`,
        },
        percentage: dashboardData?.revenuePercentage,
      },
      {
        icon: <CloseIcon />,
        title: t("statistics.cancelled"),
        item: {
          today: `${dashboardData?.cancelledToday}`,
          yesterday: `${dashboardData?.cancelledYesterday}`,
          thisWeek: `${dashboardData?.cancelledThisWeek}`,
          thisMonth: `${dashboardData?.cancelledThisMonth}`,
        },
        percentage: dashboardData?.cancelledPercentage,
      },
      {
        icon: <DeleteOutlineIcon />,
        title: t("statistics.trash"),
        item: {
          today: `${dashboardData?.trashToday}`,
          yesterday: `${dashboardData?.trashYesterday}`,
          thisWeek: `${dashboardData?.trashThisWeek}`,
          thisMonth: `${dashboardData?.trashThisMonth}`,
        },
        percentage: dashboardData?.trashPercentage,
      },
    ] as StatisticsCardProps[];
  }, [dashboardData, t]);

  const areaChartData = useMemo(() => {
    return [
      {
        values: isRevenueLoading ? [] : revenueData,
        labelName: t("statistics.revenue"),
        color: primary,
      },
      {
        values: isHoldLoading ? [] : holdData,
        labelName: t("statistics.hold"),
        color: secondary,
      },
      {
        values: isConversionLoading ? [] : conversionData,
        labelName: t("statistics.conversion"),
        color: success,
      },
      {
        values: isConversionRateLoading ? [] : conversionRateData,
        labelName: t("statistics.conversionRate"),
        color: info,
      },
    ] as AreaChartProp[];
  }, [
    conversionData,
    conversionRateData,
    holdData,
    info,
    isConversionLoading,
    isConversionRateLoading,
    isHoldLoading,
    isRevenueLoading,
    primary,
    revenueData,
    secondary,
    success,
    t,
  ]);

  return (
    <PageContainer description="this is statistics page">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <WelcomeCard
              conversionToday={dashboardData?.conversionsToday ?? 0}
              conversionRateToday={dashboardData?.conversionRateToday ?? 0}
            />
          </Grid>

          {/* column */}
          <Grid item xs={12} lg={12}>
            {isDashboardDataLoading ? (
              <CircularProgress />
            ) : (
              <TopCards data={dashboardStatisticsData} />
            )}
          </Grid>

          <Grid item xs={12} lg={12}>
            <AreaChart props={areaChartData} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
