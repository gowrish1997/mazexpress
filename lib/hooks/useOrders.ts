import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/order.model";
import useSWR from "swr";

interface IProps {
    type?: string;
    user_id?: string;
    search?: string;
    page?: number;
    per_page?: number;
    status?: string[];
    date_offset?: string;
    count_all?: boolean;
    count?: boolean;
    maz_id?: string;
    date?: string;
    // future warehouse addition
}
export default function useOrders(props: IProps) {
    console.log(props);
    //   console.log('calling use orders')
    console.log(props);
    let queryString = "";
    if (!props.count_all) {
        queryString += `?page=${
            props.page !== undefined ? props.page : 0
        }&per_page=${props.per_page !== undefined ? props.per_page : 20}`;

        if (props?.user_id) {
            queryString += `&username=${props.user_id}`;
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
        // console.log("coutn all")
        // return all order count
        queryString += "?count=all";
    }

    const {
        data: orders,
        mutate: mutateOrders,
        isLoading: ordersIsLoading,
        error: ordersError,
    } = useSWR<APIResponse<Order>>(
        props.type == "get_by_user_id"
            ? props.user_id
                ? `/api/orders` + queryString
                : null
            : `/api/orders` + queryString
    );

    return {
        orders: orders,
        // orders: props.count ? orders?.count : orders?.data as Order[],
        mutateOrders,
        ordersIsLoading,
        ordersError,
    };
}
