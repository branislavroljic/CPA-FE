import { useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@stores/authStore";
import PageContainer from "@ui/container/PageContainer";

import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import PercentIcon from "@mui/icons-material/Percent";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WelcomeCard from "./WelcomeCard";
import { StatisticsCardProps } from "@ui/dashboard/StatisticsCard";
import TopCards from "@ui/dashboard/TopCards";
import { getAdminDashboardData } from "@api/user/user";

export default function StatisticsPage() {
  const user = useAuthStore((state) => state.user);

  const { data: dashboardData, isLoading: isDashboardDataLoading } = useQuery({
    queryKey: ["dashboard", user?.id],
    queryFn: () => getAdminDashboardData(),
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
        title: "Approve rate", //ovo je Conversion rate
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
        title: "Hold",
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

          <Grid item xs={12} lg={6}>
            <Card
              sx={{ padding: "20px", borderRadius: "5px" }}
              elevation={9}
              variant={undefined}
            >
              <Typography variant="h6">Affiliates</Typography>
              <CardContent
                sx={{ padding: "0px !important", marginTop: "12px" }}
              >
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Stack direction={"column"} alignItems={"center"}>
                    <Typography fontWeight={700}>
                      {dashboardData?.numTotalUsers}
                    </Typography>
                    <Typography variant="overline">Total affiliates</Typography>
                  </Stack>
                  <Stack direction={"column"} alignItems={"center"}>
                    <Typography fontWeight={700}>
                      {dashboardData?.numApprovedUsers}
                    </Typography>
                    <Typography variant="overline">Approved</Typography>
                  </Stack>
                  <Stack direction={"column"} alignItems={"center"}>
                    <Typography fontWeight={700}>
                      {dashboardData?.numHoldUsers}
                    </Typography>
                    <Typography variant="overline">Hold</Typography>
                  </Stack>
                  <Stack direction={"column"} alignItems={"center"}>
                    <Typography fontWeight={700}>
                      {dashboardData?.numRejectedUsers}
                    </Typography>
                    <Typography variant="overline">Rejected</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card
              sx={{ padding: "20px", borderRadius: "5px" }}
              elevation={9}
              variant={undefined}
            >
              <Typography variant="h6">Offers</Typography>
              <CardContent
                sx={{ padding: "0px !important", marginTop: "12px" }}
              >
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Stack direction={"column"} alignItems={"center"}>
                    <Typography fontWeight={700}>
                      {dashboardData?.numTotalProducts}
                    </Typography>
                    <Typography variant="overline">Total products</Typography>
                  </Stack>
                  <Stack direction={"column"} alignItems={"center"}>
                    <Typography fontWeight={700}>
                      {dashboardData?.numActiveProducts}
                    </Typography>
                    <Typography variant="overline">Active</Typography>
                  </Stack>
                  <Stack direction={"column"} alignItems={"center"}>
                    <Typography fontWeight={700}>
                      {dashboardData?.numPendingProducts}
                    </Typography>
                    <Typography variant="overline">Pending</Typography>
                  </Stack>
                  <Stack direction={"column"} alignItems={"center"}>
                    <Typography fontWeight={700}>
                      {dashboardData?.numPausedProducts}
                    </Typography>
                    <Typography variant="overline">Paused</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
