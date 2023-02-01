import useSWR from "swr";
import { IOrderResponse } from "@/models/order.interface";
export default function useOrder({ id }: { id?: number | string}) {
  const { data: order, mutate: mutateOrder, isLoading: orderIsLoading } = useSWR<IOrderResponse[]>(
    `/api/orders?id=${id}`
  );

  return { order, mutateOrder, orderIsLoading };
}
