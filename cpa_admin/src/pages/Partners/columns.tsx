import { MRT_ColumnDef } from "material-react-table";
import { Box } from "@mui/material";
import { CircleFlag } from "react-circle-flags";
import { Company } from "@api/company/company";

const defaultColumns = () =>
  [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    // },
    {
      accessorKey: "companyName",
      header: "Company name",
    },

    {
      accessorKey: "country",
      header: "Country",
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <CircleFlag
            countryCode={row.original.country.toLowerCase()}
            height="25"
          />
          <span>{renderedCellValue}</span>
        </Box>
      ),
      enableColumnFilter: false,
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "address",
      header: "ZIP code",
    },
    {
      accessorKey: "companyEmail",
      header: "Company email",
    },
    {
      accessorKey: "tax",
      header: "Tax",
    },
  ] as MRT_ColumnDef<Company>[];

export default defaultColumns;
