import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
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
import i18n from "../../../i18n";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { enUS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useLocation, useNavigate } from "react-router-dom";
import { Analytics } from "@mui/icons-material";
import { getMarketars, Marketar } from "@api/analytics/analytics";

export default function MarketarTable() {
  // const { user } = useAuthStore();
  const theme = useTheme();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { state } = useLocation();

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      "marketars",
      pagination.pageIndex,
      pagination.pageSize,
      state?.id,
    ],
    queryFn: async () => {
      const pageRequest = {
        page: pagination.pageIndex,
        size: pagination.pageSize,
      } as PageRequest;

      return getMarketars(Number(state?.id) ?? 1, pageRequest);
    },
  });

  const columns = useMemo<MRT_ColumnDef<Marketar>[]>(
    () => defaultColumns(),
    []
  );

  const defaultData = useMemo(() => [] as Marketar[], []);

  const marketarsAnalyticsButton = (item: Marketar, key: string) => (
    <>
      <Tooltip arrow title={"Analytics"} key={key}>
        <IconButton
          color="warning"
          onClick={(e) => {
            navigate(item.id + "/analytics", {
              state: { userId: item.id, markertarId: item.externalMarketarId },
            });
            e.stopPropagation();
          }}
        >
          <Analytics />
        </IconButton>
      </Tooltip>
    </>
  );

  const table = useMaterialReactTable({
    columns,
    data: data?.rows ?? defaultData,
    enableSorting: false,
    manualPagination: true,
    manualFiltering: false,
    enableColumnActions: false,
    enableGlobalFilter: false,
    enableFilters: false,
    enableRowActions: true,
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
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        {marketarsAnalyticsButton(
          row.original as Marketar,
          (row.original as Marketar).id + "_" + "analytics"
        )}
      </Box>
    ),
    rowCount: data?.totalCount ?? 0,
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isFetching,
    },
    localization: MRT_Localization_EN,
    enableHiding: false,
    // displayColumnDefOptions: {
    //   "mrt-row-actions": {
    //     size: 200, //make actions column wider
    //   },
    // },
    defaultColumn: {
      minSize: 70,
      maxSize: 1000,
      size: 120,
    },
  });

  return (
    <>
      <ThemeProvider theme={createTheme(theme, enUS)}>
        <MaterialReactTable table={table} />
      </ThemeProvider>
      {/* <MarketarModal /> */}
    </>
  );
}
