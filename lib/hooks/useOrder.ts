import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/order.model";
import useSWR from "swr";
export default function useOrder({ maz_id }: { maz_id?: string }) {
  const {
    data: order,
    mutate: mutateOrder,
    isLoading: orderIsLoading,
  } = useSWR<APIResponse<Order>>(`/api/orders/${maz_id}`);

  return { order: order?.data?.[0] , mutateOrder, orderIsLoading };
}
