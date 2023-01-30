import useSWR from "swr";
import { IOrderResponse } from "@/models/order.interface";
export default function useOrders({ redirectTo = "", redirectIfFound = false, userId = null } = {}) {
    const { data: orders, mutate: mutateOrders } = useSWR<IOrderResponse[]>(`/api/orders?user=${userId}`);

    return { orders, mutateOrders };
}
