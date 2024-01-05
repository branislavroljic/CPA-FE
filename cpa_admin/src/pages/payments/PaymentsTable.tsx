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
import useAuthStore from "@stores/authStore";
import { enUS, srRS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import { TextWithTitle } from "@ui/table/TextWithTitle";
import PaymentModal from "./PaymentModal";
import { usePaymentModalStore } from "@stores/paymentStore";
import {
  Payment,
  UpdatePaymentStatus,
  getPayments,
  updatePaymentStatus,
} from "@api/payment/payment";
import { IconSwitch } from "@tabler/icons-react";

export default function PaymentsTable() {
  const { user } = useAuthStore();
  const theme = useTheme();
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const openModal = usePaymentModalStore((state) => state.openModal);

  const paymentStatuses = useMemo(
    () => [
      {
        text: "REQUESTED",
        value: "REQUESTED",
      },
      {
        text: "APPROVED",
        value: "APPROVED",
      },
      {
        text: "REJECTED",
        value: "REJECTED",
      },
    ],
    []
  );

  const { t } = useTranslation();

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      "payments",
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

      return getPayments(pageRequest, columnFilters);
    },
  });

  const changeStatusButton = (item: Payment, key: string) => (
    <Tooltip arrow title={"Change status"} key={key}>
      <IconButton
        color="warning"
        onClick={(e) => {
          openModal(item as UpdatePaymentStatus, updatePaymentStatus, true);
          e.stopPropagation();
        }}
      >
        <IconSwitch />
      </IconButton>
    </Tooltip>
  );

  const columns = useMemo<MRT_ColumnDef<Payment>[]>(
    () => defaultColumns(paymentStatuses, t),
    [paymentStatuses, t]
  );

  const defaultData = useMemo(() => [] as Payment[], []);

  const table = useMaterialReactTable({
    columns,
    data: data?.rows ?? defaultData,
    enableSorting: false,
    manualPagination: true,
    manualFiltering: true,
    enableFilters: true,
    enableColumnActions: false,
    enableRowActions : true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: i18n.t("error.tableDataError"),
        }
      : undefined,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    renderDetailPanel: ({ row }) => (
      <TextWithTitle
        title={'Komentar'}
        text={row.original.rejectComment}
      />
    ),
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
          row.original as Payment,
          (row.original as Payment).id + "_" + "payment"
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
    localization:
      i18n.language === "en"
        ? MRT_Localization_EN
        : MRT_Localization_SR_LATN_RS,
    enableHiding: false,
    defaultColumn: {
      minSize: 10,
      maxSize: 1000,
      size: 120,
    },
  });

  return (
    <>
      <ThemeProvider
        theme={createTheme(theme, i18n.language === "en" ? enUS : srRS)}
      >
        <MaterialReactTable table={table} />
      </ThemeProvider>
      <PaymentModal />
    </>
  );
}
