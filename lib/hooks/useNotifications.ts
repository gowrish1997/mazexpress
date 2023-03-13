import { APIResponse } from "@/models/api.model";
import { Notification } from "@/models/notification.model";
import useSWR from "swr";

interface IProps {
  id?: string;
  user_id?: string;
  search?: string;
  page?: number;
  per_page?: number;
  status?: string[];
  count_all?: boolean;
  count?: boolean;
}

export default function useNotifications(props: IProps) {
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
  } else {
    // return all order count
    queryString += "?count=all";
  }

  const {
    data: notifications,
    mutate: mutateNotifications,
    isLoading: notificationsIsLoading,
  } = useSWR<APIResponse<Notification>>(`/api/notifications${queryString}`);

  return {
    notifications: notifications?.data as Notification[],
    mutateNotifications,
    notificationsIsLoading,
  };
}
