import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
} from "material-react-table";
import {
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
import { LoginHistory, getLoginHistory } from "@api/user/user";
import useAuthStore from "@stores/authStore";
import { enUS, srRS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function LoginHistoryTable() {
  const { user } = useAuthStore();
  const theme = useTheme();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { t } = useTranslation();

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      "login_history",
      pagination.pageIndex,
      pagination.pageSize,
      user?.id,
    ],
    queryFn: async () => {
      const pageRequest = {
        page: pagination.pageIndex,
        size: pagination.pageSize,
      } as PageRequest;

      return getLoginHistory(pageRequest, user?.id);
    },
  });

  const columns = useMemo<MRT_ColumnDef<LoginHistory>[]>(
    () => defaultColumns(t),
    [t]
  );

  const defaultData = useMemo(() => [] as LoginHistory[], []);

  const table = useMaterialReactTable({
    columns,
    data: data?.rows ?? defaultData,
    enableSorting: false,
    manualPagination: true,
    enableFilters: false,
    enableColumnActions: false,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: i18n.t("error.tableDataError"),
        }
      : undefined,
    onPaginationChange: setPagination,
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="Refresh Data">
        <IconButton onClick={() => refetch()}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
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
    <ThemeProvider
      theme={createTheme(theme, i18n.language === "en" ? enUS : srRS)}
    >
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
}
