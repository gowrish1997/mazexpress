import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/order.model";
import useSWR from "swr";
export default function useOrder({ id }: { id?: string}) {
  const { data: order, mutate: mutateOrder, isLoading: orderIsLoading } = useSWR<APIResponse<Order>>(
    `/api/orders?id=${id}`
  );

  return { order, mutateOrder, orderIsLoading };
}
