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
  city?: string[]
}
export default function useOrders(props: IProps) {
  let queryString = "";
  if (Object.keys(props).length > 0) {
    queryString += "?";
  }

  for (var i = 0; i < Object.keys(props).length; i++) {
    const field = Object.keys(props)[i];
    if (props[field as keyof typeof props] !== undefined) {
      queryString += `${field}=${props[field as keyof typeof props]}`;
      if (i !== Object.keys(props).length - 1) {
        queryString += "&";
      }
    }
  }
  const {
    data: orderCount,
    mutate: mutateOrderCount,
    isLoading: orderCountIsLoading,
    error: orderCountError,
  } = useSWR<APIResponse<Order>>(`/api/orders/count` + queryString);

  return {
    orderCount: orderCount?.count,
    mutateOrderCount,
    orderCountIsLoading,
    orderCountError,
  };
}
