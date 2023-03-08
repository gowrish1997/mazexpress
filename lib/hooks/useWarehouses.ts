import { APIResponse } from '@/models/api.model';
import { Warehouse } from '@/models/entity/Warehouse';
import useSWR from "swr";
export default function useWarehouses({
  //   redirectTo = "",
  //   redirectIfFound = false,
  //   id = null,
} = {}) {
  const { data: warehouses, mutate: mutateWarehouses, isLoading: warehousesIsLoading } =
    useSWR<APIResponse<Warehouse>>(`/api/warehouses`);
  //   console.log(warehouses);

  return { warehouses: warehouses?.data as Warehouse[], mutateWarehouses, warehousesIsLoading };
}
