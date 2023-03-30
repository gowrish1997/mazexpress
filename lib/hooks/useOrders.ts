//==========================
//     written by: raunak
//==========================

import { QS } from "@/components/common/QS";
import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/order.model";
import useSWR from "swr";

interface IProps {
  type?: string;
  username?: string;
  search?: string;
  page?: number;
  per_page?: number;
  status?: string[];
  date?: string;
  maz_id?: string;
}
export default function useOrders(props: IProps) {
  const qs = new QS(props);

  const {
    data: orders,
    mutate: mutateOrders,
    isLoading: ordersIsLoading,
    error: ordersError,
  } = useSWR<APIResponse<Order>>(
    props.type == "get_by_email"
      ? props.username
        ? `/api/orders` + qs.stringified
        : null
      : `/api/orders` + qs.stringified,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );

  return {
    orders: orders,
    mutateOrders,
    ordersIsLoading,
    ordersError,
  };
}
