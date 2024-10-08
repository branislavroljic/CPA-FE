import { enUS } from "@mui/material/locale";
import { Stack, ThemeProvider, createTheme, useTheme } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useMemo, useState } from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import dayjs from "dayjs";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "@api/analytics/analytics";
import clientsIcon from "/src/assets/images/svgs/icon-connect.svg";
import AnalyticsTopCards from "@ui/dashboard/AnalyticsTopCards";
import AnalyticsPerDateTable from "./analytics-per-date/AnalyticsPerDateTable";
import AnalyticsPerOfferTable from "./analytics-per-offer/AnalyticsPerOfferTable";
import MarketarTable from "../marketars/MarketarsTable";

export default function AnalyticsPage() {
  const theme = useTheme();
  const params = useParams();
  const [columnFilters, setColumnFilters] = useState([
    { id: "dateTime", value: [new Date().toString(), new Date().toString()] },
  ]);
  const { state } = useLocation();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const { data, isLoading } = useQuery({
    queryKey: ["analytics", params.userId, columnFilters],
    queryFn: () =>
      getAnalytics(columnFilters, state?.userId, state?.markertarId),
  });

  // const BCrumb = useMemo(
  //   () => [
  //     {
  //       to: "/",
  //       title: "Analytics",
  //     },
  //   ],
  //   []
  // );

  const overallStatisticsData = useMemo(() => {
    const statisticsData = [
      {
        icon: clientsIcon,
        title: "Approved",
        digits: data?.conversions ?? "N/A",
        bgcolor: "success",
      },
      {
        icon: clientsIcon,
        title: "Aprove rate",
        digits: data?.conversionRate + " %" ?? "N/A",
        bgcolor: "info",
      },
      {
        icon: clientsIcon,
        title: "Total",
        digits: data?.total ?? "N/A",
        bgcolor: "info",
      },
      {
        icon: clientsIcon,
        title: "Hold",
        digits: data?.hold ?? "N/A",
        bgcolor: "warning",
      },
      {
        icon: clientsIcon,
        title: "Trash",
        digits: data?.trash ?? "N/A",
        bgcolor: "error",
      },
      {
        icon: clientsIcon,
        title: "Cancelled",
        digits: data?.cancelled ?? "N/A",
        bgcolor: "error",
      },
    ];

    return statisticsData;
  }, [data]);

  return (
    <PageContainer title="" description="this is innerpage">
      {/* <Breadcrumb items={BCrumb} title={"Analytics"} /> */}
      <ThemeProvider theme={createTheme(theme, enUS)}>
        <Stack spacing={2}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <DateRangePicker
              slots={{ field: SingleInputDateRangeField }}
              name="allowedRange"
              value={[
                dayjs(columnFilters[0].value[0] ?? dayjs(new Date())),
                dayjs(columnFilters[0].value[1] ?? dayjs(new Date())),
              ]}
              onChange={(newValue) => {
                if (newValue) {
                  setColumnFilters((prev) => [
                    ...prev,
                    {
                      id: "dateTime",
                      value: [
                        newValue[0].$d,
                        newValue[1] ? newValue[1].$d : new Date().toString(),
                      ],
                    },
                  ]);
                  setStartDate(newValue[0]?.$d || new Date());
                  setEndDate(newValue[1]?.$d || new Date());
                }
              }}
            />
            <AnalyticsTopCards data={overallStatisticsData} />
          </div>
          <AnalyticsPerDateTable startDate={startDate} endDate={endDate} />
          <AnalyticsPerOfferTable startDate={startDate} endDate={endDate} />
          {state?.hasExternalMarketars && <MarketarTable />}
        </Stack>
      </ThemeProvider>
    </PageContainer>
  );
}
