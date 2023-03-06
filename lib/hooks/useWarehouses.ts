import { WarehouseEntity } from '@/lib/adapter/entities/WarehouseEntity';
import { APIResponse } from '@/models/api.model';
import useSWR from "swr";
export default function useWarehouses({
  //   redirectTo = "",
  //   redirectIfFound = false,
  //   id = null,
} = {}) {
  const { data: warehouses, mutate: mutateWarehouses } =
    useSWR<APIResponse<WarehouseEntity>>(`/api/warehouses`);
  //   console.log(warehouses);

  return { warehouses, mutateWarehouses };
}
