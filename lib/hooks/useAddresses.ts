import { QS } from "@/components/common/QS";
import { Address } from "@/models/address.model";
import { APIResponse } from "@/models/api.model";
import useSWR from "swr";

interface IProps {
    //
    username?: string;
    status?: string[];
    per_page?: number;
    page?: number;
    include?: any[];
    type?: string;
}

export default function useAddresses(props: IProps) {
    const qs = new QS(props);

    const {
        data: addresses,
        mutate: mutateAddresses,
        isLoading: addressesIsLoading,
    } = useSWR<APIResponse<Address>>(
        props.type == "get_by_email"
            ? props.username
                ? `/api/addresses` + qs.stringified
                : null
            : `/api/addresses` + qs.stringified
    );

    return {
        addresses: addresses?.data as Address[],
        mutateAddresses,
        addressesIsLoading,
    };
}
