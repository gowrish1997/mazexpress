import { APIResponse } from "@/models/api.model";
import { Tracking } from "@/models/tracking.model";
import useSWR from "swr";
export default function useTrackings({
  user_id,
}: {
  user_id?: number | string;
}) {
  const {
    data: tracking,
    mutate: mutateTracking,
    isLoading: trackingIsLoading,
  } = useSWR<APIResponse<Tracking>>(`/api/tracking?user=${user_id}`);

  return { tracking, mutateTracking, trackingIsLoading };
}
