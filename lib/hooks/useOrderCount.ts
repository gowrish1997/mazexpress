//==========================
//     written by: raunak
//==========================

import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/order.model";
import useSWR from "swr";
import { QS } from "@/components/common/QS";

interface IProps {
  username?: string;
  search?: string;
  page?: number;
  per_page?: number;
  status?: string[];
  date?: string;
  maz_id?: string;
  city?: string[]
}
export default function useOrders(props: IProps) {
  const qs = new QS(props)
  // qs.clg("pd")
  const {
    data: orderCount,
    mutate: mutateOrderCount,
    isLoading: orderCountIsLoading,
    error: orderCountError,
  } = useSWR<APIResponse<Order>>(`/api/orders/count` + qs.stringified);

  return {
    orderCount: orderCount?.count,
    mutateOrderCount,
    orderCountIsLoading,
    orderCountError,
  };
}
