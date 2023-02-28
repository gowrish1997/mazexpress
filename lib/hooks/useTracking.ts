import useSWR from "swr";

export default function useTracking({
  order_id,
}: {
  order_id?: string;
}) {
  const {
    data: tracking,
    mutate: mutateTracking,
    isLoading: trackingIsLoading,
  } = useSWR<any>(`/api/tracking?order=${order_id}`, {
    refreshInterval: 3000,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return { tracking, mutateTracking, trackingIsLoading };
}
