import { QS } from '@/components/common/QS';
//==========================
//     written by: raunak
//==========================


import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/order.model";
import useSWR from "swr";

interface IProps {
  username?: string;
  search?: string;
  page?: number;
  per_page?: number;
  status?: string[];
  date?: string;
  maz_id?: string;
}
export default function useOrders(props: IProps) {
  const qs = new QS(props)
  const {
    data: orders,
    mutate: mutateOrders,
    isLoading: ordersIsLoading,
    error: ordersError,
  } = useSWR<APIResponse<Order>>(`/api/orders` + qs.stringified);

  return {
    orders: orders?.data as Order[],
    mutateOrders,
    ordersIsLoading,
    ordersError,
  };
}
