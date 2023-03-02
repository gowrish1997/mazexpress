import { OrderEntity } from '@/lib/adapter/entities/OrderEntity';
import useSWR from "swr";
export default function useOrder({ id }: { id?: string}) {
  const { data: order, mutate: mutateOrder, isLoading: orderIsLoading } = useSWR<OrderEntity[]>(
    `/api/orders?id=${id}`
  );

  return { order, mutateOrder, orderIsLoading };
}
