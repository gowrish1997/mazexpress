import useSWR from "swr";

export default function useTracking({ order_id }: { order_id?: string }) {
  console.log(order_id)
    const {
        data: tracking,
        mutate: mutateTracking,
        isLoading: trackingIsLoading,
    } = useSWR<any>(`/api/tracking?order=${order_id}`, {
        refreshInterval: 1000,
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
    });

    return { tracking, mutateTracking, trackingIsLoading };
}
