import useSWR from "swr";
import { IOrderResponse } from "@/models/order.interface";
export default function useOrders(props: { userId?: number }) {
    let queryString = "";
    if (props?.userId) {
        queryString += `?user=${props.userId}`;
    }

    const { data: orders, mutate: mutateOrders, isLoading: ordersIsLoading, error: ordersError } = useSWR<IOrderResponse[]>(`/api/orders`+queryString);

    return { orders, mutateOrders, ordersIsLoading, ordersError };
}
