import useSWR from "swr";
import { IOrderResponse } from "@/models/order.interface";

interface IProps {
  user_id?: number;
  search?: string;
  page?: number;
  per_page?: number;
  status?: string;
  date_offset?: number;
  // future warehouse addition
}
type Data = {
    msg?: string;
    data?: IOrderResponse[];
    total_count?: number;
  };


export default function useOrders(props: IProps) {
  let queryString = "";

  queryString += `?page=${props.page !== undefined ? props.page : 0}&per_page=${
    props.per_page !== undefined ? props.per_page : 20
  }`;

  if (props?.user_id) {
    queryString += `&user=${props.user_id}`;
  }

  if (props?.search) {
    queryString += `&search=${props.search}`;
  }

  const {
    data: orders,
    mutate: mutateOrders,
    isLoading: ordersIsLoading,
    error: ordersError,
  } = useSWR<Data>(`/api/orders` + queryString);

  return { orders, mutateOrders, ordersIsLoading, ordersError };
}
