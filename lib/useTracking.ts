import useSWR from "swr";

export default function useTracking({ order_id }: { order_id?: number | string}) {
  const { data: tracking, mutate: mutateTracking, isLoading: trackingIsLoading } = useSWR<any>(
    `/api/tracking?order=${order_id}`
  );

  return { tracking, mutateTracking, trackingIsLoading };
}
