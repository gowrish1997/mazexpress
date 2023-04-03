import { QS } from "@/components/common/QS";
import { APIResponse } from "@/models/api.model";
import { Notification } from "@/models/notification.model";
import useSWR from "swr";
// props.type == "get_by_email"
// ? props.username
//     ? `/api/notifications` + qs.stringified
//     : null
// :

interface IProps {
    type?: string;
    //   id?: string;
    username?: string;
    search?: string;
    page?: number;
    per_page?: number;
    status?: string[];
}

export default function useNotifications(props: IProps) {
    let qs = new QS(props);
    console.log(props);

    const {
        data: notifications,
        mutate: mutateNotifications,
        isLoading: notificationsIsLoading,
    } = useSWR<APIResponse<Notification>>(
        `/api/notifications` + qs.stringified,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            revalidateIfStale: true,
            revalidateOnMount: true,
        }
    );

    return {
        notifications: notifications?.data as Notification[],
        mutateNotifications,
        notificationsIsLoading,
    };
}
