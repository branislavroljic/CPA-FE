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
import { PageRequest } from "@api/utils";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import useAuthStore from "@stores/authStore";
import { enUS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import defaultColumns from "./columns";
import i18n from "../../../../i18n";
import {
  AnalyticsPerOffer,
  getAnalyticsPerOffer,
} from "@api/analytics/analytics";
import { useLocation } from "react-router-dom";

interface AnalyticsPerOfferTableProps {
  startDate?: Date | null;
  endDate?: Date | null;
}

export default function AnalyticsPerOfferTable({
  startDate,
  endDate,
}: AnalyticsPerOfferTableProps) {
  const { user } = useAuthStore();
  const theme = useTheme();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const columnFilters: MRT_ColumnFiltersState = useMemo(
    () => [
      { id: "dateTime", value: [startDate?.toString(), endDate?.toString()] },
    ],
    [startDate, endDate]
  );

  const { state } = useLocation();
  console.log(state)

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      "analytics_per_offer",
      pagination.pageIndex,
      pagination.pageSize,
      user?.id,
      startDate,
      endDate,
      columnFilters,
    ],
    queryFn: async () => {
      const pageRequest = {
        page: pagination.pageIndex,
        size: pagination.pageSize,
      } as PageRequest;

      return getAnalyticsPerOffer(state?.userId, columnFilters, pageRequest);
    },
  });

  const columns = useMemo<MRT_ColumnDef<AnalyticsPerOffer>[]>(
    () => defaultColumns(),
    []
  );

  const defaultData = useMemo(() => [] as AnalyticsPerOffer[], []);

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
      </Box>
    ),
    rowCount: data?.totalCount ?? 0,
    state: {
      isLoading,
      pagination,
      columnFilters,
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
