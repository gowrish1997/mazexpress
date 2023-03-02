import { WarehouseEntity } from '@/lib/adapter/entities/WarehouseEntity';
import useSWR from "swr";
export default function useWarehouses({
  //   redirectTo = "",
  //   redirectIfFound = false,
  //   id = null,
} = {}) {
  const { data: warehouses, mutate: mutateWarehouses } =
    useSWR<WarehouseEntity[]>(`/api/warehouses`);
  //   console.log(warehouses);

  return { warehouses, mutateWarehouses };
}
