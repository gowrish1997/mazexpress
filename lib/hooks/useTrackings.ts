import { TrackingEntity } from './../adapter/entities/TrackingEntity';
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
  } = useSWR<TrackingEntity[]>(`/api/tracking?user=${user_id}`);

  return { tracking, mutateTracking, trackingIsLoading };
}
