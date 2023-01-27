import useSWR from "swr";
import { IWarehouse, IWarehouseProps } from "@/models/warehouse.interface";
export default function useWarehouses({
  //   redirectTo = "",
  //   redirectIfFound = false,
  //   id = null,
} = {}) {
  const { data: warehouses, mutate: mutateWarehouses } =
    useSWR<IWarehouseProps[]>(`/api/warehouses`);
  //   console.log(warehouses);

  return { warehouses, mutateWarehouses };
}
