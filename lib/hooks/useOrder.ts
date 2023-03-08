import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/entity/Order";
import useSWR from "swr";
export default function useOrder({ id }: { id?: string}) {
  const { data: order, mutate: mutateOrder, isLoading: orderIsLoading } = useSWR<APIResponse<Order>>(
    `/api/orders?id=${id}`
  );

  return { order, mutateOrder, orderIsLoading };
}
