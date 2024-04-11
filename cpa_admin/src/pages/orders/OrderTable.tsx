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
import { useTranslation } from "react-i18next";
import useAuthStore from "@stores/authStore";
import { enUS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Order,
  UpdateOrderStatus,
  getOrders,
  updateOrderStatus,
} from "@api/order/order";
import OrderModal from "./OrderModal";
import { useOrderModalStore } from "@stores/orderStore";
import { IconSwitch } from "@tabler/icons-react";

export default function OrderTable() {
  const { user } = useAuthStore();
  const theme = useTheme();
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const openModal = useOrderModalStore((state) => state.openModal);

  const orderStatuses = useMemo(
    () => [
      {
        text: "REQUESTED",
        value: "REQUESTED",
      },
      {
        text: "TRASH",
        value: "TRASH",
      },
      {
        text: "CANCELLED",
        value: "CANCELLED",
      },
      {
        text: "DONE",
        value: "DONE",
      },
    ],
    []
  );

  const { t } = useTranslation();

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      "orders",
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

      return getOrders(pageRequest, columnFilters);
    },
  });

  const changeStatusButton = (item: Order, key: string) => (
    <Tooltip arrow title={"Promijeni status"} key={key}>
      <IconButton
        color="warning"
        onClick={(e) => {
          openModal(item as UpdateOrderStatus, updateOrderStatus, true);
          e.stopPropagation();
        }}
      >
        <IconSwitch />
      </IconButton>
    </Tooltip>
  );

  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => defaultColumns(orderStatuses, t),
    [orderStatuses, t]
  );

  const defaultData = useMemo(() => [] as Order[], []);

  const table = useMaterialReactTable({
    columns,
    initialState: {
      columnVisibility: {
        baseURL: false,
        referrer: false,
        userIP: false,
        operatingSystem: false,
        browserName: false,
        browserVersion: false,
        deviceType: false,
        sub1: false,
        sub2: false,
        sub3: false,
        sub4: false,
      },
    },
    data: data?.rows ?? defaultData,
    enableSorting: false,
    manualPagination: true,
    manualFiltering: true,
    enableColumnActions: false,
    enableGlobalFilter: false,
    enableFilters: true,
    enableRowActions: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: i18n.t("error.tableDataError"),
        }
      : undefined,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
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
        {changeStatusButton(
          row.original as Order,
          (row.original as Order).id + "_" + "order"
        )}
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
      size: 120,
    },
  });

  return (
    <>
      <ThemeProvider theme={createTheme(theme, enUS)}>
        <MaterialReactTable table={table} />
      </ThemeProvider>
      <OrderModal />
    </>
  );
}
