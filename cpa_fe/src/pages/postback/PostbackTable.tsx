import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
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
import { PageRequest } from "@api/utils";
import i18n from "../../i18n";
import { MRT_Localization_SR_LATN_RS } from "material-react-table/locales/sr-Latn-RS";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { useTranslation } from "react-i18next";
import useAuthStore from "@stores/authStore";
import { enUS, srRS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Postback, getPostbacks } from "@api/user/user";
import defaultColumns from "./columns";
import PostbackModal from "./PostbackModal";
import { usePostbackModalStore } from "@stores/postbackStore";
import {
  createPostback,
  deletePostback,
  updatePostback,
} from "@api/postback/postback";
import queryClient, { invalidateAllQueries } from "../../query-client";
import { getDeleteIcon, getEditIcon } from "@ui/table/DefaultIconColumns";
import { ConfirmModal } from "@ui/modal/ConfirmModal";
import { IconTrash } from "@tabler/icons-react";

export default function PostbackTable() {
  const { user } = useAuthStore();
  const theme = useTheme();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();
  const openModal = usePostbackModalStore((state) => state.openModal);

  const { t } = useTranslation();

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["postback", pagination.pageIndex, pagination.pageSize, user?.id],
    queryFn: async () => {
      const pageRequest = {
        page: pagination.pageIndex,
        size: pagination.pageSize,
      } as PageRequest;

      return getPostbacks(pageRequest, user?.id);
    },
  });

  const columns = useMemo<MRT_ColumnDef<Postback>[]>(
    () => defaultColumns(t),
    [t]
  );

  const defaultData = useMemo(() => [] as Postback[], []);

  const deleteMutation = useMutation({
    mutationFn: deletePostback,
    onSuccess: () => invalidateAllQueries(queryClient, "postback"),
  });

  const editButton = useMemo(() => {
    return getEditIcon<Postback>((item) => {
      openModal(Object.assign(item), updatePostback, true);
    });
  }, []);

  const deleteButton = useMemo(() => {
    return getDeleteIcon<Postback>((id) => {
      setDeleteId(id);
      setIsDeleteOpen(true);
    });
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: data?.rows ?? defaultData,
    enableSorting: false,
    manualPagination: true,
    onPaginationChange: setPagination,
    enableFilters: false,
    enableColumnActions: false,
    enableColumnResizing: true,
    layoutMode: "grid",
    enableRowActions: true,
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
        <Button
          color="secondary"
          onClick={() => {
            openModal({} as Postback, createPostback, true);
          }}
          variant="contained"
        >
          {t("postback.addPostback")}
        </Button>
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        {editButton(
          row.original as Postback,
          (row.original as Postback).id + "_" + "edit",
          t
        )}
        {deleteButton(
          row.original as Postback,
          (row.original as Postback).id + "_" + "delete",
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
        <PostbackModal />
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
      {/* <PaymentModal /> */}
    </>
  );
}
