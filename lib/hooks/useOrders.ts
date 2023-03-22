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
  let queryString = "";
  if (Object.keys(props).length > 0) {
    queryString += "?";
  }

  for (var i = 0; i < Object.keys(props).length; i++) {
    const field = Object.keys(props)[i];
    queryString += `${field}=${props[field as keyof typeof props]}`;
    if (i !== Object.keys(props).length - 1) {
      queryString += "&";
    }
  }
  const {
    data: orders,
    mutate: mutateOrders,
    isLoading: ordersIsLoading,
    error: ordersError,
  } = useSWR<APIResponse<Order>>(`/api/orders` + queryString);

  return {
    orders: orders?.data as Order[],
    mutateOrders,
    ordersIsLoading,
    ordersError,
  };
}
