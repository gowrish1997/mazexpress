import useSWR from "swr";
<<<<<<< HEAD
import { IOrderResponse } from "@/models/order.interface";
export default function useOrders({ redirectTo = "", redirectIfFound = false, userId = null } = {}) {
    const { data: orders, mutate: mutateOrders } = useSWR<IOrderResponse[]>(`/api/orders?user=${userId}`);

    return { orders, mutateOrders };
=======
import { IOrder } from "@/models/order.interface";
import { number } from "yup";

export default function useOrders({ userId }: {userId: number | null | undefined}) {
  const { data: orders, mutate: mutateOrders } = useSWR<IOrder[]>(
    `/api/orders?user=${userId}`
  );

  return { orders, mutateOrders };
>>>>>>> raunak
}
