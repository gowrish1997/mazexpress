import { APIResponse } from "@/models/api.model";
import { Tracking } from "@/models/tracking.model";
import useSWR from "swr";
export default function useTrackings({
  username,
}: {
  username?: number | string;
}) {
  const {
    data: tracking,
    mutate: mutateTracking,
    isLoading: trackingIsLoading,
  } = useSWR<APIResponse<Tracking>>(`/api/tracking/${username}`);

  return { tracking, mutateTracking, trackingIsLoading };
}
