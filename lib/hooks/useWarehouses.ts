import { APIResponse } from "@/models/api.model";
import { Warehouse } from "@/models/warehouse.model";

import useSWR from "swr";
import fetchJson from "../fetchSelf";

interface IProp {}
export default function useWarehouses() {
  const {
    data: warehouses,
    mutate: mutateWarehouses,
    isLoading: warehousesIsLoading,
  } = useSWR<APIResponse<Warehouse>>(`/api/warehouses`, fetchJson, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    revalidateOnMount: true,
  });

  return {
    warehouses: warehouses?.data as Warehouse[],
    mutateWarehouses,
    warehousesIsLoading,
  };
}
