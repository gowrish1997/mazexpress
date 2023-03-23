import { Address } from "@/models/address.model";
import { APIResponse } from "@/models/api.model";
import useSWR from "swr";

interface IProps {
    user_id?: string | undefined;
    id?: string | undefined;
    status?: string;
    per_page?: number;
    page?: number;
    type?: string;
}

export default function useAddresses(props: IProps) {
    let queryString = "";

    let page, per_page;
    page = props.page ? props.page : 0;
    per_page = props.per_page ? props.per_page : 6;
    queryString += `?per_page=${per_page}&page=${page}`;

    if (props?.user_id) {
        queryString += `&username=${props?.user_id}`;
    }

    if (props?.id) {
        queryString += `&id=${props?.id}`;
    }

    if (props?.status) {
        queryString += `&status=${props?.status}`;
    }

    // const {
    //   data: addresses,
    //   mutate: mutateAddresses,
    //   isLoading: addressesIsLoading,
    // } = useSWR<APIResponse<Address>>( `/api/addresses` + queryString);
    const {
        data: addresses,
        mutate: mutateAddresses,
        isLoading: addressesIsLoading,
    } = useSWR<APIResponse<Address>>(
        props.type == "get_by_user_id"
            ? props.user_id
                ? `/api/addresses` + queryString
                : null
            : `/api/addresses` + queryString
    );

    return { addresses: addresses?.data, mutateAddresses, addressesIsLoading };
}
