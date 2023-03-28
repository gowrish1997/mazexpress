import { QS } from "@/components/common/QS";
import { APIResponse } from "@/models/api.model";
import { Notification } from "@/models/notification.model";
import useSWR from "swr";

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

    const {
        data: notifications,
        mutate: mutateNotifications,
        isLoading: notificationsIsLoading,
    } = useSWR<APIResponse<Notification>>(
        props.type == "get_by_email"
            ? props.username
                ? `/api/notifications` + qs.stringified
                : null
            : `/api/notifications` + qs.stringified
    );

    return {
        notifications: notifications?.data as Notification[],
        mutateNotifications,
        notificationsIsLoading,
    };
}
