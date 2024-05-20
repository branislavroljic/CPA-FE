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
import i18n from "../../i18n";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { enUS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import { Company, getCompanies } from "@api/company/company";
import { IconShoppingCart } from "@tabler/icons-react";

export default function PartnersTable() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["partners", pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      const pageRequest = {
        page: pagination.pageIndex,
        size: pagination.pageSize,
      } as PageRequest;

      return getCompanies(pageRequest);
    },
  });

  const statisticsButton = (item: Company, key: string) => (
    <Tooltip arrow title={"Orders"} key={key}>
      <IconButton
        color="info"
        onClick={(e) => {
          navigate(item.userId + "/orders", { state: item });
          e.stopPropagation();
        }}
      >
        <IconShoppingCart />
      </IconButton>
    </Tooltip>
  );

  const columns = useMemo<MRT_ColumnDef<Company>[]>(() => defaultColumns(), []);

  const defaultData = useMemo(() => [] as Company[], []);

  const table = useMaterialReactTable({
    columns,
    data: data?.rows ?? defaultData,
    enableSorting: false,
    manualPagination: true,
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
        {statisticsButton(
          row.original as Company,
          (row.original as Company).id + "_" + "statistics"
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
    displayColumnDefOptions: {
      "mrt-row-actions": {
        size: 100, //make actions column wider
      },
    },
    defaultColumn: {
      minSize: 70,
      maxSize: 1000,
      size: 130,
    },
  });

  return (
    <>
      <ThemeProvider theme={createTheme(theme, enUS)}>
        <MaterialReactTable table={table} />
      </ThemeProvider>
      {/* <CompanyModal /> */}
    </>
  );
}
