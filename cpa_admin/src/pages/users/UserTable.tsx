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
import useAuthStore from "@stores/authStore";
import { enUS } from "@mui/material/locale";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  User,
  approveAccount,
  getUsers,
  updateAccountManager,
  updateStatus,
  updateVIP,
} from "@api/user/user";
import { TextWithTitle } from "@ui/table/TextWithTitle";
import VerifiedIcon from "@mui/icons-material/VerifiedTwoTone";
import BlockIcon from "@mui/icons-material/Block";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useAccountManagerModalStore } from "@stores/accountManagerStore";
import AccountManagerModal from "./AccountManagerModal";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate } from "react-router-dom";

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
  const { openModal } = useAccountManagerModalStore();
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

  const changeAccountManager = (item: User, key: string) => (
    <Tooltip arrow title={"Change Account Manager"} key={key}>
      <IconButton
        color="secondary"
        onClick={(e) => {
          openModal(item, updateAccountManager, true);
          e.stopPropagation();
        }}
      >
        <SupervisorAccountIcon />
      </IconButton>
    </Tooltip>
  );

  const statisticsButton = (item: User, key: string) => (
    <Tooltip arrow title={"Dashboard"} key={key}>
      <IconButton
        color="info"
        onClick={(e) => {
          navigate(item.id + "/statistics", { state: item });
          e.stopPropagation();
        }}
      >
        <BarChartIcon />
      </IconButton>
    </Tooltip>
  );

  const blockOrApproveButton = (item: User, key: string) => (
    <>
      {item.status != "BLOCKED" && item.status != "ON_HOLD_MAIL_CONFIRMED" ? (
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
      ) : item.status == "BLOCKED" ? (
        <Tooltip arrow title={"Unblock"} key={key}>
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
      ) : (
        <Tooltip arrow title={"Approve"} key={key}>
          <IconButton
            color="success"
            onClick={(e) => {
              openModal(item, approveAccount, true);
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
      {item.enabledVipProducts == "ENABLED" ? (
        <Tooltip arrow title={"Disable VIP"} key={key}>
          <IconButton
            color="error"
            onClick={(e) => {
              updateVIP(item.id, "BLOCKED").then((response) => {
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
              updateVIP(item.id, "ENABLED").then((response) => {
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
    () => defaultColumns(accountStatuses),
    [accountStatuses]
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
          text={
            row.original.accountManagerId
              ? row.original.accountManagerId + ""
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
        {blockOrApproveButton(
          row.original as User,
          (row.original as User).id + "_" + "block_or_approve"
        )}
        {enableDisableVIPButton(
          row.original as User,
          (row.original as User).id + "_" + "VIP"
        )}
        {changeAccountManager(
          row.original as User,
          (row.original as User).id + "_" + "account_manager"
        )}
        {statisticsButton(
          row.original as User,
          (row.original as User).id + "_" + "statistics"
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
    displayColumnDefOptions: {
      "mrt-row-actions": {
        size: 200, //make actions column wider
      },
    },
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
        <AccountManagerModal />
      </ThemeProvider>
      {/* <UserModal /> */}
    </>
  );
}
