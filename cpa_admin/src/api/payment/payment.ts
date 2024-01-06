import {
  Page,
  PageRequest,
  addFilterParams,
  addPaginationParams,
  get,
  put,
} from "@api/utils";
import { MRT_ColumnFiltersState } from "material-react-table";

const baseUrl = new URL("payment", import.meta.env.VITE_API_URL);
const baseUrlWithSlash = new URL("payment/", import.meta.env.VITE_API_URL);

export type Payment = {
  id: number;
  amount: number;
  balanceBeforeRequest: number;
  method: string;
  description: string;
  descriptionEng: string;
  rejectComment: string;
  rejectCommentEng: string;
  status: string;
  createdAt: Date;
  editedAt: Date;
  userId: number;
  userUsername: string;
};

export type UpdatePaymentStatus = {
  id?: number;
  status: string;
  description: string;
  descriptionEng: string;
  rejectComment?: string;
  rejectCommentEng?: string;
};

// export type FilterPayment = {
//   userId?: number;
//   status?: string;
// };

export function getPayments(
  pagination: PageRequest,
  filter?: MRT_ColumnFiltersState
): Promise<Page<Payment>> {
  return get(
    addPaginationParams(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addFilterParams(baseUrl, filter ?? (null as any)),
      pagination
    )
  );
}

export function updatePaymentStatus(input: UpdatePaymentStatus) {
  return put(new URL("" + input.id, baseUrlWithSlash), JSON.stringify(input));
}
