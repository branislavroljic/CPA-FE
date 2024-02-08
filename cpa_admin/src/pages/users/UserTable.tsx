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
import { enUS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import { User, getUsers, updateStatus, updateVIP } from "@api/user/user";
import { TextWithTitle } from "@ui/table/TextWithTitle";
import VerifiedIcon from "@mui/icons-material/VerifiedTwoTone";
import BlockIcon from "@mui/icons-material/Block";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function UserTable() {
  const { user } = useAuthStore();
  const theme = useTheme();
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  // const openModal = useUserModalStore((state) => state.openModal);

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

  const { t } = useTranslation();

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

  // const changeStatusButton = (item: User, key: string) => (
  //   <Tooltip arrow title={"Promijeni status"} key={key}>
  //     <IconButton
  //       color="warning"
  //       onClick={(e) => {
  //         openModal(item as UpdateUserStatus, updateUserStatus, true);
  //         e.stopPropagation();
  //       }}
  //     >
  //       <IconSwitch />
  //     </IconButton>
  //   </Tooltip>
  // );

  const blockOrApproveButton = (item: User, key: string) => (
    <>
      {item.status != "BLOCKED" ? (
        <Tooltip arrow title={"Block"} key={key}>
          <IconButton
            color="error"
            onClick={(e) => {
              updateStatus(item.id, "BLOCKED").then((response) => {
                if (response.status === 200) {
                  refetch();
                }
              });
              e.stopPropagation();
            }}
          >
            <BlockIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip arrow title={"Approve"} key={key}>
          <IconButton
            color="success"
            onClick={(e) => {
              updateStatus(item.id, "APPROVED").then((response) => {
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

  const enableDisableVIPButton = (item: User, key: string) => (
    <>
      {item.enabledVipProducts ? (
        <Tooltip arrow title={"Disable VIP"} key={key}>
          <IconButton
            color="error"
            onClick={(e) => {
              updateVIP(item.id, !item.enabledVipProducts).then((response) => {
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
              updateVIP(item.id, !item.enabledVipProducts).then((response) => {
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

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => defaultColumns(accountStatuses, t),
    [accountStatuses, t]
  );

  const defaultData = useMemo(() => [] as User[], []);

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
          text={row.original.accountManager?.id + "" ?? "N/A"}
        />
        <TextWithTitle
          title={" Account manager username"}
          text={row.original.accountManager?.username ?? "N/A"}
        />
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
        {blockOrApproveButton(
          row.original as User,
          (row.original as User).id + "_" + "block_or_approve"
        )}
        {enableDisableVIPButton(
          row.original as User,
          (row.original as User).id + "_" + "VIP"
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
    localization:
      i18n.language === "en"
        ? MRT_Localization_EN
        : MRT_Localization_SR_LATN_RS,
    enableHiding: false,
    defaultColumn: {
      minSize: 100,
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
