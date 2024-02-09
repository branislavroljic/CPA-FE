import { useMemo } from "react";
import { Box, CircularProgress, Grid, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@stores/authStore";
import PageContainer from "@ui/container/PageContainer";
import TopCards from "@ui/dashboard/TopCards";
import { useTranslation } from "react-i18next";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import PercentIcon from "@mui/icons-material/Percent";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  StatisticsReport,
  getConversionRateStatistics,
  getConversionStatistics,
  getDashboardData,
  getHoldStatistics,
  getRevenueStatistics,
} from "@api/user/user";
import { StatisticsCardProps } from "@ui/dashboard/StatisticsCard";
import AreaChart, { AreaChartProp } from "@ui/dashboard/AreaChart";
import WelcomeCard from "./WelcomeCard";
import { useLocation } from "react-router-dom";

export interface BarChartProps {
  title: string;
  subtitle: string;
  dataLabel1: string;
  dataLabel2: string;
  dataItem1: string;
  dataItem2: string;
  data: StatisticsReport[];
}

export default function UserStatisticsPage() {
  const { state } = useLocation();
  const { t } = useTranslation();

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const success = theme.palette.success.main;
  const info = theme.palette.info.main;

  const { data: dashboardData, isLoading: isDashboardDataLoading } = useQuery({
    queryKey: ["dashboard", state?.id],
    queryFn: () => getDashboardData(state?.id),
  });

  const { data: revenueData, isLoading: isRevenueLoading } = useQuery({
    queryKey: ["revenue_statistics", state?.id],
    queryFn: () => getRevenueStatistics(state?.id),
  });

  const { data: holdData, isLoading: isHoldLoading } = useQuery({
    queryKey: ["hold_statistics", state?.id],
    queryFn: () => getHoldStatistics(state?.id),
  });

  const { data: conversionRateData, isLoading: isConversionRateLoading } =
    useQuery({
      queryKey: ["conversion_rate_statistics", state?.id],
      queryFn: () => getConversionRateStatistics(state?.id),
    });

  const { data: conversionData, isLoading: isConversionLoading } = useQuery({
    queryKey: ["conversion_statistics", state?.id],
    queryFn: () => getConversionStatistics(state?.id),
  });

  const dashboardStatisticsData = useMemo(() => {
    return [
      {
        icon: <RefreshRoundedIcon />,
        title: "Conversion",
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
        title: "Conversion rate",
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
        title: "Requested",
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
        title: "Revenue",
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
        title: "Cancelled",
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
        title: "Trash",
        item: {
          today: `${dashboardData?.trashToday}`,
          yesterday: `${dashboardData?.trashYesterday}`,
          thisWeek: `${dashboardData?.trashThisWeek}`,
          thisMonth: `${dashboardData?.trashThisMonth}`,
        },
        percentage: dashboardData?.trashPercentage,
      },
    ] as StatisticsCardProps[];
  }, [dashboardData]);

  const areaChartData = useMemo(() => {
    return [
      {
        values: isRevenueLoading ? [] : revenueData,
        labelName: "Revenue",
        color: primary,
      },
      {
        values: isHoldLoading ? [] : holdData,
        labelName: "Hold",
        color: secondary,
      },
      {
        values: isConversionLoading ? [] : conversionData,
        labelName: "Conversion",
        color: success,
      },
      {
        values: isConversionRateLoading ? [] : conversionRateData,
        labelName: "Conversion rate",
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
