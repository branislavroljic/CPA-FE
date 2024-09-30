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
import i18n from "../../../i18n";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import useAuthStore from "@stores/authStore";
import { enUS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import { TextWithTitle } from "@ui/table/TextWithTitle";
import { useNavigate } from "react-router-dom";
import { Analytics, FormatListBulleted } from "@mui/icons-material";
import { getUsers, User } from "@api/analytics/analytics";

export default function UserTable() {
  const { user } = useAuthStore();
  const theme = useTheme();
  const navigate = useNavigate();
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const accountStatuses = useMemo(
    () => [
      {
        text: "BLOCKED",
        value: "BLOCKED",
      },
      {
        text: "APPROVED",
        value: "APPROVED",
      },
      {
        text: "ON_HOLD_MAIL_CONFIRMED",
        value: "ON_HOLD_MAIL_CONFIRMED",
      },
      {
        text: "ON_HOLD_MAIL_NOT_CONFIRMED",
        value: "ON_HOLD_MAIL_NOT_CONFIRMED",
      },
    ],
    []
  );

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      "users",
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

      return getUsers(pageRequest, columnFilters);
    },
  });

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => defaultColumns(accountStatuses),
    [accountStatuses]
  );

  const defaultData = useMemo(() => [] as User[], []);

  const marketarsAnalyticsButton = (item: User, key: string) => (
    <>
      {/* {item.hasExternalMarketars ? (
        <Tooltip arrow title={"Details"} key={key}>
          <IconButton
            onClick={(e) => {
              navigate(item.id + "/marketars", { state: item });
              e.stopPropagation();
            }}
          >
            <FormatListBulleted />
          </IconButton>
        </Tooltip>
      ) : ( */}
      <Tooltip arrow title={"Analytics"} key={key}>
        <IconButton
          color="warning"
          onClick={(e) => {
            navigate(item.id + "/analytics", {
              state: {
                userId: item.id,
                hasExternalMarketars: item.hasExternalMarketars,
                marketarId: item.id,
              },
            });
            e.stopPropagation();
          }}
        >
          <Analytics />
        </IconButton>
      </Tooltip>
      {/* )} */}
    </>
  );

  const table = useMaterialReactTable({
    columns,
    data: data?.rows ?? defaultData,
    enableSorting: false,
    manualPagination: true,
    manualFiltering: true,
    enableColumnActions: false,
    enableGlobalFilter: false,
    enableFilters: true,
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
    onColumnFiltersChange: setColumnFilters,
    renderDetailPanel: ({ row }) => (
      <>
        <TextWithTitle title={"First name"} text={row.original.name} />
        <TextWithTitle title={"Last name"} text={row.original.surname} />
        <TextWithTitle
          title={"Role"}
          text={row.original.roles.map((role) => role.name).join(",")}
        />
        <TextWithTitle title={"Experience"} text={row.original.experience} />
        <TextWithTitle title={"Chat service"} text={row.original.chatService} />
        <TextWithTitle
          title={"Registration date"}
          text={row.original.registrationDate}
        />
        <TextWithTitle title={"Facebook"} text={row.original.facebookLink} />
        <TextWithTitle title={"Google"} text={row.original.googleLink} />
        <TextWithTitle title={"Twitter"} text={row.original.twitterLink} />
        <TextWithTitle title={"Linkedin"} text={row.original.linkedinLink} />
        <TextWithTitle title={"Instagram"} text={row.original.instagramLink} />
        <TextWithTitle title={"Skype"} text={row.original.skypeLink} />
        <TextWithTitle title={"Telegram"} text={row.original.telegramLink} />
        <TextWithTitle title={"Whatsapp"} text={row.original.whatsappLink} />
        <TextWithTitle
          title={"Account manager ID"}
          text={
            row.original.accountManagerId
              ? row.original.accountManagerId + ""
              : "N/A"
          }
        />
        <TextWithTitle
          title={"Account manager username"}
          text={
            row.original.accountManagerUsername
              ? row.original.accountManagerUsername
              : "N/A"
          }
        />
        {/* <TextWithTitle
          title={" Account manager username"}
          text={row.original.accountManager?.username ?? "N/A"}
        /> */}
      </>
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
        {marketarsAnalyticsButton(
          row.original as User,
          (row.original as User).id + "_" + "analytics"
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
      {/* <UserModal /> */}
    </>
  );
}
