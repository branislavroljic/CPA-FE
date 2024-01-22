import { useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Report,
  getOverallStatisticForCompany,
  getReportsFromCompanyWorkersByDay,
  getReportsWithinCompanyByDayForMonth,
  getReportsWithinCompanyByMonth,
} from '@api/statistic/statistics';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@stores/authStore';
import PageContainer from '@ui/container/PageContainer';
import TopCards from '@ui/dashboard/TopCards';
import employeeIcon from '/src/assets/images/svgs/icon-user-male.svg';
import clientsIcon from '/src/assets/images/svgs/icon-briefcase.svg';
import totalIncomeIcon from '/src/assets/images/svgs/icon-master-card-2.svg';
import totalDicountSavingsIcon from '/src/assets/images/svgs/icon-pie.svg';
import pointsIcon from '/src/assets/images/svgs/icon-master-card.svg';
import numberOfAddressesIcon from '/src/assets/images/svgs/icon-mailbox.svg';
import AreaChart from '../../components/ui/dashboard/AreaChart';
import { useTranslation } from 'react-i18next';
import PointsList from '@pages/points/PointsList';
import BarChart from '@ui/dashboard/BarChart';
import WelcomeCard from './WelcomeCard';

export interface AreaChartProps {
  title: string;
  data: Report[];
  labelName?: string;
  color: string;
}

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

  const currentMonth = useMemo(() => {
    return new Date().getMonth();
  }, []);

  const reportsFromCompanyWorkersQuery = useQuery({
    queryKey: ['statistics_by_user', user?.companyId],
    queryFn: () => getReportsFromCompanyWorkersByDay(user?.companyId),
  });

  const reportsWithinCompanyByMonthQuery = useQuery({
    queryKey: ['statistics_within_company_by_month', user?.companyId],
    queryFn: () => getReportsWithinCompanyByMonth(user?.companyId),
  });

  const reportsWithinCompanyByDayForMonthQuery = useQuery({
    queryKey: [
      'statistics_within_company_by_day_for_month',
      user?.companyId,
      currentMonth,
    ],
    queryFn: () =>
      getReportsWithinCompanyByDayForMonth(user?.companyId, currentMonth),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['overall_statistics', user?.companyId],
    queryFn: () => getOverallStatisticForCompany(user?.companyId),
  });

  const overallStatisticsData = useMemo(() => {
    return [
      {
        icon: employeeIcon,
        title: t('statistic.employees'),
        digits: data?.numberOfWorkers?.toString() ?? 'N/A',
        bgcolor: 'primary',
      },
      {
        icon: clientsIcon,
        title: t('statistic.clients'),
        digits: data?.totalUsers?.toString() ?? 'N/A',
        bgcolor: 'warning',
      },
      {
        icon: totalIncomeIcon,
        title: t('statistic.totalIncome'),
        digits: t('statistic.currency', {
          value: data?.totalIncome?.toFixed(2).toString() ?? '0.00',
          currency: user?.currency,
        }),
        bgcolor: 'primary',
      },
      {
        icon: totalDicountSavingsIcon,
        title: t('statistic.totalDiscountSavings'),
        digits: t('statistic.currency', {
          value: data?.totalDiscountSavings?.toFixed(2).toString() ?? '0.00 ',
          currency: user?.currency,
        }),
        bgcolor: 'error',
      },
      {
        icon: pointsIcon,
        title: t('statistic.points'),
        digits: data?.points?.toString() ?? '0',
        bgcolor: 'warning',
      },
      {
        icon: numberOfAddressesIcon,
        title: t('statistic.numberOfAddresses'),
        digits: data?.numberOfAddresses?.toString() ?? 'N/A',
        bgcolor: 'success',
      },
      // {
      //   icon: totalDicountSavingsIcon,
      //   title: t('statistic.totalDiscountSavings'),
      //   digits: t('statistic.currency', {
      //     value: data?.totalSpentByWorkers?.toFixed(2).toString() ?? '0.00 ',
      //   }),
      //   bgcolor: 'error',
      // },
      // {
      //   icon: totalDicountSavingsIcon,
      //   title: t('statistic.totalDiscountSavings'),
      //   digits: t('statistic.currency', {
      //     value:
      //       data?.totalDiscountSavingsByWorkers?.toFixed(2).toString() ??
      //       '0.00 ',
      //   }),
      //   bgcolor: 'error',
      // },
    ];
  }, [data, t]);

  return (
    <PageContainer description="this is statistics page">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <WelcomeCard
              totalSpentByWorkers={t('statistic.currency', {
                value:
                  data?.totalSpentByWorkers?.toFixed(2).toString() ?? '0.00',
                currency: user?.currency,
              })}
              totalDiscountSavingsByWorkers={t('statistic.currency', {
                value:
                  data?.totalDiscountSavingsByWorkers?.toFixed(2).toString() ??
                  '0.00 ',
                currency: user?.currency,
              })}
            />
          </Grid>

          {/* column */}
          <Grid item xs={12} lg={12}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <TopCards data={overallStatisticsData} />
            )}
          </Grid>

          <Grid item xs={12} lg={8}>
            <AreaChart
              title={t('statistic.workerTransactions')}
              labelName={t('statistic.totalAmount')}
              data={reportsFromCompanyWorkersQuery.data}
              color={primary}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* Point transactions */}
            <Card
              sx={{
                padding: 0,
                border: 'none',
                height: '420px',
              }}
            >
              <CardContent sx={{ pb: '50px', height: '100%' }}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems={'center'}
                >
                  <Box pb={2}>
                    <Typography variant="h5">
                      {t('statistic.pointTransactions')}
                    </Typography>
                  </Box>
                </Stack>
                <PointsList />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <BarChart
              title={t('statistic.companyTransactions')}
              subtitle={t('statistic.monthlyTransactions')}
              dataLabel1={t('statistic.totalAmount')}
              dataItem1={t('statistic.currency', {
                value: data?.totalIncome?.toFixed(2).toString() ?? '0.00',
                currency: user?.currency,
              })}
              dataLabel2={t('statistic.totalDiscountSavings')}
              dataItem2={t('statistic.currency', {
                value:
                  data?.totalDiscountSavings?.toFixed(2).toString() ?? '0.00 ',
                currency: user?.currency,
              })}
              data={reportsWithinCompanyByMonthQuery.data}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <AreaChart
              title={t('statistic.dailyByMonthCompanyTransactions')}
              labelName={t('statistic.totalAmount')}
              data={reportsWithinCompanyByDayForMonthQuery.data}
              color={secondary}
            />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
  // return (
  //   <>
  //     <Grid
  //       container
  //       spacing={4}
  //       alignItems="center"
  //       justifyContent="center"
  //       style={{ minHeight: '100vh' }}
  //     >
  //       <Grid item xs={12} md={8} lg={10}>
  //         <Paper
  //           sx={{
  //             p: 2,
  //             display: 'flex',
  //             flexDirection: 'column',
  //             height: 240,
  //             width: '100%',
  //           }}
  //         >
  //           <Chart
  //             data={reportsFromCompanyWorkersQuery.data}
  //             title="Transakcije radnika"
  //             xAxisTooltipName="Datum"
  //             yAxisTooltipName="Iznos"
  //           />
  //         </Paper>
  //       </Grid>
  //       <Grid container direction={'row'} spacing={2}>
  //         <Grid item xs={8} md={8} lg={8}>
  //           <Paper
  //             sx={{
  //               p: 2,
  //               display: 'flex',
  //               flexDirection: 'column',
  //               height: 240,
  //             }}
  //           >
  //             <Chart
  //               data={reportsWithinCompanyQuery.data}
  //               title="Transakcije kompanije"
  //               xAxisTooltipName="Datum"
  //               yAxisTooltipName="Iznos"
  //             />
  //           </Paper>
  //         </Grid>
  //         {/* <Grid item xs={4} md={4} lg={4}>
  //           <Paper
  //             sx={{
  //               height: 400,
  //             }}
  //           >
  //             <CustomPieChart
  //               title={'Promet iz drugih kompanija'}
  //               data={numOfUsersPerCompanyBuyingQuery.data}
  //             />
  //           </Paper>
  //         </Grid> */}
  //       </Grid>
  //     </Grid>
  //   </>
  // );
}
