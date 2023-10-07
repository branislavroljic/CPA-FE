// import { Transaction } from "@api/transaction/transactions";
import { MRT_ColumnDef } from "material-react-table";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";
import { TFunction } from "i18next";
import { LoginHistory } from "@api/user/user";

// dayjs.extend(utc);
// dayjs.extend(timezone);

const defaultColumns = (
  t: TFunction<"translation", undefined, "translation">
) =>
  [
    {
      accessorKey: "ip",
      header: t("user.firstname"),
    },
    {
      accessorKey: "country",
      header: t("user.lastname"),
    },
    {
      accessorKey: "status",
      header: t("user.lastname"),
    },
    {
      accessorKey: "device",
      header: t("user.lastname"),
    },
    {
      accessorKey: "browser",
      header: t("user.lastname"),
    },
    {
      accessorKey: "browserVersion",
      header: t("user.lastname"),
    },
    {
      accessorKey: "operatingSystem",
      header: t("user.lastname"),
    },
    {
      accessorKey: "createdTime",
      header: t("user.lastname"),
    },
    {
      accessorKey: "userUsername",
      header: t("user.lastname"),
    },
    // {
    //   accessorFn: (row) => `${row.discount * 100} %`,
    //   header: t('transaction.discount'),
    //   enableColumnFilter: false,
    //   muiTableHeadCellProps: {
    //     align: 'center',
    //   },
    //   muiTableBodyCellProps: {
    //     align: 'center',
    //   },
    //   Cell: ({
    //     // eslint-disable-next-line react/prop-types
    //     cell,
    //   }) => (
    //     <Box
    //       component="span"
    //       sx={(theme) => ({
    //         backgroundColor: theme.palette.info.dark,
    //         borderRadius: '0.50rem',
    //         color: '#fff',
    //         maxWidth: '9ch',
    //         p: '0.5rem',
    //       })}
    //     >
    //       {
    //         // eslint-disable-next-line react/prop-types
    //         cell.getValue<number>()
    //       }
    //     </Box>
    //   ),
    // },
  ] as MRT_ColumnDef<LoginHistory>[];

export default defaultColumns;
