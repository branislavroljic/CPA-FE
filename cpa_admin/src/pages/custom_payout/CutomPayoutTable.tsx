import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_PaginationState,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  Box,
  Button,
  IconButton,
  ThemeProvider,
  Tooltip,
  createTheme,
  useTheme,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import defaultColumns from "./columns";
import i18n from "../../i18n";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { useTranslation } from "react-i18next";
import { enUS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getDeleteIcon } from "@ui/table/DefaultIconColumns";
import { ConfirmModal } from "@ui/modal/ConfirmModal";
import queryClient, { invalidateAllQueries } from "../../query-client";
import { IconTrash } from "@tabler/icons-react";
import {
  createCustomPayout,
  CustomPayout,
  deleteCustomPayout,
  getCustomPayouts,
} from "@api/custom-payout/custom-payout";
import { PageRequest } from "@api/utils";
import CustomPayoutModal from "./CustomPayoutModal";
import { useCustomPayoutModalStore } from "@stores/customPayoutStore";

export default function CustomPayoutTable() {
  const theme = useTheme();
  const openModal = useCustomPayoutModalStore((state) => state.openModal);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { t } = useTranslation();

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["custom_payouts", pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      const pageRequest = {
        page: pagination.pageIndex,
        size: pagination.pageSize,
      } as PageRequest;

      return getCustomPayouts(pageRequest);
    },
  });

  const columns = useMemo<MRT_ColumnDef<CustomPayout>[]>(
    () => defaultColumns(),
    []
  );

  const defaultData = useMemo(() => [] as CustomPayout[], []);

  const deleteMutation = useMutation({
    mutationFn: deleteCustomPayout,
    onSuccess: () => invalidateAllQueries(queryClient, "custom_payouts"),
  });

  const deleteButton = useMemo(() => {
    return getDeleteIcon<CustomPayout>((id) => {
      setDeleteId(id);
      setIsDeleteOpen(true);
    });
  }, []);

  const createCustomPayoutButton = () => (
    <Button
      color="secondary"
      onClick={() => {
        openModal({} as CustomPayout, createCustomPayout, true);
      }}
      variant="contained"
    >
      {"Add custom payout"}
    </Button>
  );

  const table = useMaterialReactTable({
    columns,
    data: data?.rows ?? defaultData,
    enableSorting: false,
    manualPagination: true,
    enableColumnActions: false,
    enableGlobalFilter: false,
    enableFilters: false,
    enableRowActions: true,
    positionActionsColumn: "last",
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
        {createCustomPayoutButton()}
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        {deleteButton(
          row.original as CustomPayout,
          (row.original as CustomPayout).id + "_" + "delete",
          t
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
    enableHiding: true,
    defaultColumn: {
      minSize: 10,
      maxSize: 1000,
      size: 70,
    },
  });

  return (
    <>
      <ThemeProvider theme={createTheme(theme, enUS)}>
        <MaterialReactTable table={table} />
        <ConfirmModal
          title={t("util.delete")}
          content={t("util.sureDelete")}
          Icon={IconTrash}
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          primaryAction={() => {
            if (!deleteId) return;
            deleteMutation.mutate(deleteId);
            setDeleteId(undefined);
            setIsDeleteOpen(false);
          }}
        />
      </ThemeProvider>
      <CustomPayoutModal />
    </>
  );
}
