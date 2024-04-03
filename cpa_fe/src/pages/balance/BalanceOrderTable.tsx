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
import { MRT_Localization_SR_LATN_RS } from "material-react-table/locales/sr-Latn-RS";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { useTranslation } from "react-i18next";
import { BalanceOrder, getBalanceOrders } from "@api/user/user";
import useAuthStore from "@stores/authStore";
import { enUS, srRS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DateRangePicker } from "rsuite";

export default function BalanceBalanceOrderTable() {
  const { user } = useAuthStore();
  const theme = useTheme();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([
    { id: "dateTime", value: [new Date(), new Date()] },
  ]);

  const [value, setValue] = useState([new Date(), new Date()]);

  const { t } = useTranslation();

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      "balance_BalanceOrders",
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

      return getBalanceOrders(columnFilters, pageRequest, user?.id);
    },
  });

  const columns = useMemo<MRT_ColumnDef<BalanceOrder>[]>(
    () => defaultColumns(t),
    [t]
  );

  const defaultData = useMemo(() => [] as BalanceOrder[], []);

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
        {/* <DemoContainer components={["SingleInputDateRangeField"]}>
          <DateRangePicker
            slots={{ field: SingleInputDateRangeField }}
            name="allowedRange"
            value={[
              dayjs(columnFilters[0].value[0] ?? dayjs(new Date())),
              dayjs(columnFilters[0].value[1] ?? dayjs(new Date())),
            ]}
            onChange={(newValue) => {
              if (newValue)
                setColumnFilters((prev) => [
                  ...prev,
                  {
                    id: "dateTime",
                    value: [
                      newValue[0] ? newValue[0].$d : new Date().toString(),
                      newValue[1] ? newValue[1].$d : new Date().toString(),
                    ],
                  },
                ]);
            }}
          />
        </DemoContainer> */}
        <DateRangePicker
          value={value}
          onChange={(newValue) => {
            if (newValue) {
              setValue(newValue);
              setColumnFilters((prev) => [
                ...prev,
                {
                  id: "dateTime",
                  value: [newValue[0], newValue[1]],
                },
              ]);
            }
          }}
        />
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
    localization:
      i18n.language === "en"
        ? MRT_Localization_EN
        : MRT_Localization_SR_LATN_RS,
    enableHiding: true,
    defaultColumn: {
      minSize: 10,
      maxSize: 1000,
      size: 120,
    },
  });

  return (
    <ThemeProvider
      theme={createTheme(theme, i18n.language === "en" ? enUS : srRS)}
    >
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
}
