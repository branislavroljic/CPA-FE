import { useMemo, useState } from "react";
import {
  MaterialReactTable,
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
import { MRT_Localization_SR_LATN_RS } from "material-react-table/locales/sr-Latn-RS";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { useTranslation } from "react-i18next";
import { enUS, srRS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import PaymentModal from "./CategoryModal";
import { useCategoryModalStore } from "@stores/categoryStore";
import {
  Category,
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@api/category/category";
import { getDeleteIcon, getEditIcon } from "@ui/table/DefaultIconColumns";
import { ConfirmModal } from "@ui/modal/ConfirmModal";
import queryClient, { invalidateAllQueries } from "../../query-client";
import { IconTrash } from "@tabler/icons-react";

export default function CategoryTable() {
  const theme = useTheme();
  const openModal = useCategoryModalStore((state) => state.openModal);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();

  const { t } = useTranslation();

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return getCategories();
    },
  });

  const columns = useMemo<MRT_ColumnDef<Category>[]>(
    () => defaultColumns(),
    []
  );

  const defaultData = useMemo(() => [] as Category[], []);

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => invalidateAllQueries(queryClient, "categories"),
  });

  const editButton = useMemo(() => {
    return getEditIcon<Category>((item) => {
      openModal(Object.assign(item), updateCategory, true);
    });
  }, []);

  const deleteButton = useMemo(() => {
    return getDeleteIcon<Category>((id) => {
      setDeleteId(id);
      setIsDeleteOpen(true);
    });
  }, []);

  const createCategoryButton = () => (
    <Button
      color="secondary"
      onClick={() => {
        openModal({} as Category, createCategory, true);
      }}
      variant="contained"
    >
      {"Dodaj kategoriju"}
    </Button>
  );

  const table = useMaterialReactTable({
    columns,
    data: data ?? defaultData,
    enableSorting: false,
    manualPagination: false,
    enablePagination: false,
    enableFilters: false,
    enableColumnActions: false,
    enableRowActions : true,
    positionActionsColumn : 'last',
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
        {createCategoryButton()}
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        {editButton(
          row.original as Category,
          (row.original as Category).id + "_" + "edit",
          t
        )}
        {deleteButton(
          row.original as Category,
          (row.original as Category).id + "_" + "delete",
          t
        )}
      </Box>
    ),
    rowCount: data?.length ?? 0,
    state: {
      isLoading,
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
      <PaymentModal />
    </>
  );
}
