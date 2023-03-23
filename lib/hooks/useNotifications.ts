import { APIResponse } from "@/models/api.model";
import { Notification } from "@/models/notification.model";
import useSWR from "swr";

interface IProps {
    type?: string;
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

    let page, per_page;
    page = props.page ? props.page : 0;
    per_page = props.per_page ? props.per_page : 6;
    queryString += `?per_page=${per_page}&page=${page}`;

    if (!props.count_all) {
        if (props?.user_id) {
            queryString += `&username=${props.user_id}`;
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
    } = useSWR<APIResponse<Notification>>(
        props.type == "get_by_user_id"
            ? props.user_id
                ? `/api/notifications${queryString}`
                : null
            : `/api/notifications${queryString}`
    );

    return {
        notifications: notifications?.data as Notification[],
        mutateNotifications,
        notificationsIsLoading,
    };
}
