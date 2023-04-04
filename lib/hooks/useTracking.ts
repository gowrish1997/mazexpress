import { QS } from "@/components/common/QS";
import { APIResponse } from "@/models/api.model";
import { Tracking } from "@/models/tracking.model";
import useSWR from "swr";

interface IProps {
  username?: string;
  search?: string;
  page?: number;
  per_page?: number;
  // stage?: string[];
  // date_offset?: string;
  // count_all?: boolean;
  // count?: boolean;
  maz_id?: string;
  // order_id?: string;
  // future warehouse addition
}

export default function useTracking(props: IProps) {
  let maz_removed = { ...props };
  delete maz_removed["maz_id"];
  // console.log(maz_removed);
  let qs = new QS(maz_removed);

  // qs.clg()
  const {
    data: tracking,
    mutate: mutateTracking,
    isLoading: trackingIsLoading,
  } = useSWR<APIResponse<Tracking>>(
    props.maz_id ? `/api/tracking/${props.maz_id}` + qs.stringified : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
      revalidateOnMount: true,
  }
  );

  return { tracking: tracking?.data, mutateTracking, trackingIsLoading };
}
