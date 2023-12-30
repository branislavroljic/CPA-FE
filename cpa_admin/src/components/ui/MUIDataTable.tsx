// import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
// import i18n from '../../i18n';
// import { IconButton, Tooltip } from '@mui/material';
// import {
//   ColumnFiltersState,
//   OnChangeFn,
//   PaginationState,
//   SortingState,
// } from '@tanstack/react-table';
// import RefreshIcon from '@mui/icons-material/Refresh';

// export interface DataTableProps<T extends Record<string, any>> {
//   data: T[];
//   columns: MRT_ColumnDef<T>[];
//   isLoading: boolean;
//   isError: boolean;
//   hasPaging?: true;
//   onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
//   onPaginationChange?: OnChangeFn<PaginationState> | undefined;
//   onSortingChange?: OnChangeFn<SortingState> | undefined;
//   additionalColumns?: AdditionalColumn<T>[];
//   expandedRow?: (data: T, key: string, colSpan: number) => JSX.Element;
// }

// export default function MUIDataTable<T extends Record<string, any>>({
//   data,
//   columns,
//   isLoading,
//   isError,
//   onColumnFiltersChange,
//   onPaginationChange,
//   onSortingChange,
// }: DataTableProps<T>) {
//   <MaterialReactTable
//     columns={columns}
//     data={data} //data is undefined on first render
//     initialState={{ showColumnFilters: true }}
//     manualFiltering
//     manualPagination
//     manualSorting
//     enableGlobalFilter={false}
//     muiToolbarAlertBannerProps={
//       isError
//         ? {
//             color: 'error',
//             children: i18n.t('error.tableDataError'),
//           }
//         : undefined
//     }
//     onColumnFiltersChange={onColumnFiltersChange}
//     onPaginationChange={onPaginationChange}
//     onSortingChange={onSortingChange}
//     renderTopToolbarCustomActions={() => (
//       <Tooltip arrow title="Refresh Data">
//         <IconButton onClick={() => refetch()}>
//           <RefreshIcon />
//         </IconButton>
//       </Tooltip>
//     )}
//     rowCount={data?.totalCount ?? 0}
//     state={{
//       columnFilters,
//       isLoading,
//       pagination,
//       showAlertBanner: isError,
//       showProgressBars: isFetching,
//       sorting,
//     }}
//     localization={MRT_Localization_SR_LATN_RS}
//     enableRowActions
//     positionActionsColumn="last"
//     displayColumnDefOptions={{
//       'mrt-row-actions': {
//         header: '', //change header text
//       },
//     }}
//     renderRowActions={({ row, table }) => (
//       <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
//         {row.original.status !== CompanyStatus.DELETED && (
//           <IconButton
//             color="primary"
//             onClick={() => {
//               const item = row.original as Company;
//               openModal(
//                 { ...item, typeId: item.type.id } as InputCompany,
//                 // {
//                 //   typeId: item.type.id,
//                 //   adminEmail: item.adminEmail,
//                 //   adminFirstname: item.adminFirstname,
//                 //   adminLastname: item.adminLastname,
//                 //   adminPhoneNumber: item.adminPhoneNumber,
//                 //   discount: item.discount,
//                 //   name: item.name,
//                 //   id: item.id,
//                 // } as InputCompany,
//                 updateCompany,
//                 true,
//                 true
//               );
//             }}
//           >
//             <EditIcon />
//           </IconButton>
//         )}
//         {row.original.status !== CompanyStatus.DELETED ? (
//           <IconButton
//             color="error"
//             onClick={() => {
//               setDeleteId(row.original.id);
//               setIsDeleteOpen(true);
//             }}
//           >
//             <DeleteIcon />
//           </IconButton>
//         ) : (
//           <IconButton
//             color="success"
//             onClick={() => {
//               setRestoreId(row.original.id);
//               setIsRestoreOpen(true);
//             }}
//           >
//             <RestoreIcon />
//           </IconButton>
//         )}
//       </Box>
//     )}
//   />;
// }
// function refetch(): void {
//     throw new Error('Function not implemented.');
// }

