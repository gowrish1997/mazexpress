import useSWR from "swr";
import { IOrderResponse } from "@/models/order.interface";
export default function useOrders({ userId }: { userId?: number }) {
  const { data: orders, mutate: mutateOrders, isLoading: ordersIsLoading, error: ordersError } = useSWR<IOrderResponse[]>(
    `/api/orders?user=${userId}`
  );

  return { orders, mutateOrders, ordersIsLoading, ordersError };
}
