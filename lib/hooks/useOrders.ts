import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/entity/Order";
import useSWR from "swr";

interface IProps {
  user_id?: string;
  search?: string;
  page?: number;
  per_page?: number;
  status?: string[];
  date_offset?: string;
  // future warehouse addition
}
export default function useOrders(props: IProps) {
  //   console.log('calling use orders')
  //   console.log(props.page)
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

  if (props?.status) {
    queryString += `&status=${props.status}`;
  }

  const {
    data: orders,
    mutate: mutateOrders,
    isLoading: ordersIsLoading,
    error: ordersError,
  } = useSWR<APIResponse<Order>>(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/orders` + queryString);

  return { orders: orders?.data as Order[], mutateOrders, ordersIsLoading, ordersError };
}
