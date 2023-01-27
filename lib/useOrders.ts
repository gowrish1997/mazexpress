import useSWR from "swr";
import { IOrder } from "@/models/order.interface";

export default function useOrders({
  redirectTo = "",
  redirectIfFound = false,
  userId = null,
} = {}) {
  const { data: orders, mutate: mutateOrders } = useSWR<IOrder[]>(
    `/api/orders?user=${userId}`
  );

  return { orders, mutateOrders };
}
