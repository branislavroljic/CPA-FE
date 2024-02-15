import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
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
import i18n from "../../i18n";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import useAuthStore from "@stores/authStore";
import { enUS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import { VIPRequest, getVIPRequests, resolveVIPRequest } from "@api/vip/vip";
import VerifiedIcon from "@mui/icons-material/VerifiedTwoTone";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function VIPRequestsTable() {
  const { user } = useAuthStore();
  const theme = useTheme();

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["vip_requests", user?.id],
    queryFn: async () => {
      return getVIPRequests();
    },
  });

  const columns = useMemo<MRT_ColumnDef<VIPRequest>[]>(
    () => defaultColumns(),
    []
  );

  const defaultData = useMemo(() => [] as VIPRequest[], []);

  const enableDisableVIPButton = (item: VIPRequest, key: string) => (
    <>
      {item.done ? (
        <Tooltip arrow title={"Disable VIP"} key={key}>
          <IconButton
            color="error"
            onClick={(e) => {
              resolveVIPRequest(item.id, "BLOCKED").then((response) => {
                if (response.status === 200) {
                  refetch();
                }
              });
              e.stopPropagation();
            }}
          >
            <RemoveCircleIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip arrow title={"Enable VIP"} key={key}>
          <IconButton
            color="warning"
            onClick={(e) => {
              resolveVIPRequest(item.userId, "ENABLED").then((response) => {
                if (response.status === 200) {
                  refetch();
                }
              });
              e.stopPropagation();
            }}
          >
            <VerifiedIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );

  const table = useMaterialReactTable({
    columns,
    data: data ?? defaultData,
    enableSorting: false,
    manualPagination: false,
    enableColumnActions: false,
    enableGlobalFilter: false,
    enableFilters: false,
    enableColumnResizing: true,
    enableRowActions: true,
    layoutMode: "grid",
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: i18n.t("error.tableDataError"),
        }
      : undefined,
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
        {enableDisableVIPButton(
          row.original as VIPRequest,
          (row.original as VIPRequest).id + "_" + "VIP"
        )}
      </Box>
    ),
    rowCount: data?.length ?? 0,
    state: {
      isLoading,
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
