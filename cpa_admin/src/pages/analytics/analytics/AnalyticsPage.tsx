import { enUS } from "@mui/material/locale";
import {
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  useTheme,
} from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import { useMemo, useState } from "react";
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
import { setEndTime, setStartTime } from "@pages/util/util";

import { DateRangePicker } from "rsuite";
import { MRT_ColumnFiltersState } from "material-react-table";

export default function AnalyticsPage() {
  const theme = useTheme();
  const params = useParams();

  const initialStartDate = setStartTime(new Date());
  const initialEndDate = setEndTime(new Date());

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([
    { id: "dateTime", value: [initialStartDate, initialEndDate] },
  ]);
  const [value, setValue] = useState([initialStartDate, initialEndDate]);

  const { state } = useLocation();

  const { data } = useQuery({
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
              isoWeek
              value={value}
              onChange={(newValue) => {
                if (newValue) {
                  const [startDate, endDate] = newValue;
                  const updatedStartDate = setStartTime(startDate);
                  const updatedEndDate = setEndTime(endDate);

                  setValue([updatedStartDate, updatedEndDate]);
                  setColumnFilters((prev) => [
                    ...prev,
                    {
                      id: "dateTime",
                      value: [updatedStartDate, updatedEndDate],
                    },
                  ]);
                }
              }}
            />
            <AnalyticsTopCards data={overallStatisticsData} />
          </div>
          <Typography variant="h5" align="center">
            Analytics per date
          </Typography>
          <AnalyticsPerDateTable startDate={value[0]} endDate={value[1]} />
          <Typography variant="h5" align="center">
            Analytics per offer
          </Typography>
          <AnalyticsPerOfferTable startDate={value[0]} endDate={value[1]} />
          {state?.hasExternalMarketars && <MarketarTable />}
        </Stack>
      </ThemeProvider>
    </PageContainer>
  );
}
