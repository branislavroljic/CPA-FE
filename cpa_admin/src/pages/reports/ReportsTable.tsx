import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
  MRT_ColumnFiltersState,
} from "material-react-table";
import {
  Box,
  IconButton,
  ThemeProvider,
  Tooltip,
  createTheme,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import defaultColumns from "./columns";
import { PageRequest } from "@api/utils";
import i18n from "../../i18n";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import useAuthStore from "@stores/authStore";
import { enUS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Report, getReports } from "@api/order/order";
import { setEndTime, setStartTime } from "@pages/util/util";
import { DateRangePicker } from "rsuite";

export default function ReportsTable() {
  const { user } = useAuthStore();
  const theme = useTheme();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const initialStartDate = setStartTime(new Date());
  const initialEndDate = setEndTime(new Date());

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([
    { id: "dateTime", value: [initialStartDate, initialEndDate] },
  ]);

  const [value, setValue] = useState([initialStartDate, initialEndDate]);

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      "reports",
      pagination.pageIndex,
      pagination.pageSize,
      user?.id,
      columnFilters,
    ],
    queryFn: async () => {
      const pageRequest = {
        page: pagination.pageIndex,
        size: pagination.pageSize,
      } as PageRequest;

      return getReports(columnFilters, pageRequest);
    },
  });

  const columns = useMemo<MRT_ColumnDef<Report>[]>(() => defaultColumns(), []);

  const defaultData = useMemo(() => [] as Report[], []);

  const table = useMaterialReactTable({
    columns,
    data: data?.rows ?? defaultData,
    enableSorting: false,
    manualPagination: true,
    enableColumnActions: false,
    enableGlobalFilter: false,
    enableFilters: false,
    enableColumnResizing: true,
    layoutMode: "grid",
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: i18n.t("error.tableDataError"),
        }
      : undefined,
    onPaginationChange: setPagination,
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: "flex", gap: "1rem", p: "4px" }}>
        <Tooltip arrow title="Refresh Data">
          <IconButton onClick={() => refetch()}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <DemoContainer components={["SingleInputDateRangeField"]}>
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
        </DemoContainer>
      </Box>
    ),
    rowCount: data?.totalCount ?? 0,
    state: {
      isLoading,
      pagination,
      // columnFilters,
      showAlertBanner: isError,
      showProgressBars: isFetching,
    },
    localization: MRT_Localization_EN,
    enableHiding: true,
    defaultColumn: {
      minSize: 10,
      maxSize: 1000,
      size: 70,
    },
  });

  return (
    <ThemeProvider theme={createTheme(theme, enUS)}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
}
