import useSWR from "swr";
import { ITracking } from "@/models/order.interface";
export default function useTracking({ order_id }: { order_id?: number | string}) {
  const { data: tracking, mutate: mutateTracking, isLoading: trackingIsLoading } = useSWR<ITracking[]>(
    `/api/tracking?order=${order_id}`
  );

  return { tracking, mutateTracking, trackingIsLoading };
}
