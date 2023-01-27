import useSWR from "swr";
import { IOrder } from "@/models/order.interface";
import { number } from "yup";

export default function useOrders({ userId }: {userId: number | null | undefined}) {
  const { data: orders, mutate: mutateOrders } = useSWR<IOrder[]>(
    `/api/orders?user=${userId}`
  );

  return { orders, mutateOrders };
}
