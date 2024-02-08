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
import { useQuery } from "@tanstack/react-query";
import defaultColumns from "./columns";
import { PageRequest } from "@api/utils";
import i18n from "../../i18n";
import { MRT_Localization_SR_LATN_RS } from "material-react-table/locales/sr-Latn-RS";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { useTranslation } from "react-i18next";
import { Domain, getDomains } from "@api/user/user";
import useAuthStore from "@stores/authStore";
import { enUS, srRS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useDomainModalStore } from "@stores/domainStore";
import { InputDomain, addDomain, verifyDomain } from "@api/domain/domain";
import DomainModal from "./DomainModal";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import queryClient, { invalidateAllQueries } from "../../query-client";
import { IconDiscountCheckFilled } from "@tabler/icons-react";
import ClickPopover from "./ClickPopover";
import { useNotificationStore } from "@stores/notificationStore";

export default function DomainsTable() {
  const { user } = useAuthStore();
  const theme = useTheme();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const openModal = useDomainModalStore((state) => state.openModal);
  const openNotification = useNotificationStore(
    (state) => state.openNotification
  );

  const { t } = useTranslation();

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["domains", pagination.pageIndex, pagination.pageSize, user?.id],
    queryFn: async () => {
      const pageRequest = {
        page: pagination.pageIndex,
        size: pagination.pageSize,
      } as PageRequest;

      return getDomains(pageRequest, user?.id);
    },
  });

  const columns = useMemo<MRT_ColumnDef<Domain>[]>(
    () => defaultColumns(t),
    [t]
  );

  const defaultData = useMemo(() => [] as Domain[], []);

  const verifyDomainMutation = useNotifiedMutation({
    mutationFn: verifyDomain,
    onSuccess: async (response) => {
      const body = await response.data;
      if (body.success) {
        openNotification({
          isError: false,
          primaryText: t("util.success"),
          secondaryText: t("util.persistSuccess"),
        });
        invalidateAllQueries(queryClient, "domains");
      } else {
        openNotification({
          isError: true,
          primaryText: t("util.errorOccurred"),
        });
      }
    },
    showSuccessNotification: false,
  });

  const verifyDomainButton = (item: Domain) =>
    item.status !== "ACTIVE" ? (
      <Tooltip arrow title={t("domain.verify")} key={item.id}>
        <IconButton
          color="warning"
          onClick={(e) => {
            e.stopPropagation();
            verifyDomainMutation.mutate(item?.id);
          }}
        >
          <DomainVerificationIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <IconDiscountCheckFilled color="success" />
    );

  const table = useMaterialReactTable({
    columns,
    data: data?.rows ?? defaultData,
    enableSorting: false,
    manualPagination: true,
    enableFilters: false,
    enableColumnActions: false,
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
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          p: "4px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip arrow title="Refresh Data">
          <IconButton onClick={() => refetch()}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Button
          color="secondary"
          onClick={() => {
            openModal({} as InputDomain, addDomain, true);
          }}
          variant="contained"
        >
          {t("domain.addDomain")}
        </Button>
        <ClickPopover />
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
    enableHiding: true,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <Box>{verifyDomainButton(row.original as Domain)}</Box>
    ),
  });

  return (
    <>
      <ThemeProvider
        theme={createTheme(theme, i18n.language === "en" ? enUS : srRS)}
      >
        <MaterialReactTable table={table} />
      </ThemeProvider>
      <DomainModal />
    </>
  );
}
