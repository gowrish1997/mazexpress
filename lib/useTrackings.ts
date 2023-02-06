import useSWR from "swr";
import { ITracking } from "@/models/order.interface";
export default function useTrackings({ user_id }: { user_id?: number | string }) {
    const { data: tracking, mutate: mutateTracking, isLoading: trackingIsLoading } = useSWR<ITracking[]>(`/api/tracking?user=${user_id}`);

    return { tracking, mutateTracking, trackingIsLoading };
}
