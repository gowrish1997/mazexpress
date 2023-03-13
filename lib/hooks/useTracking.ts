import { APIResponse } from "@/models/api.model";
import { Tracking } from "@/models/tracking.model";
import useSWR from "swr";

interface IProps {
  user_id?: string;
  search?: string;
  page?: number;
  per_page?: number;
  status?: string[];
  date_offset?: string;
  count_all?: boolean;
  count?: boolean;
  maz_id?: string;
  order_id?: string; 
  // future warehouse addition
}

export default function useTracking(props: IProps) {
  let queryString = "";
  if (!props.count_all) {
    queryString += `?page=${
      props.page !== undefined ? props.page : 0
    }&per_page=${props.per_page !== undefined ? props.per_page : 20}`;

    if (props?.user_id) {
      queryString += `&user=${props.user_id}`;
    }

    if (props?.search) {
      queryString += `&search=${props.search}`;
    }

    if (props?.status) {
      queryString += `&status=${props.status}`;
    }
    if (props?.maz_id) {
      queryString += `&maz_id=${props.maz_id}`;
    }
  } else {
    // return all order count
    queryString += "?count=all";
  }

  const {
    data: tracking,
    mutate: mutateTracking,
    isLoading: trackingIsLoading,
  } = useSWR<APIResponse<Tracking>>(`/api/tracking${queryString}`, {
    // refreshInterval: 3000,
    // revalidateIfStale: true,
    // revalidateOnFocus: true,
    // revalidateOnReconnect: true,
  });

  return { tracking: tracking?.data, mutateTracking, trackingIsLoading };
}
