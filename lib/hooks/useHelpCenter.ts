import { AxiosResponse } from "axios";
import useSWR from "swr";

export interface IHelpCenter {
    address_1: string;
    address_2: string;
    city: string;
    comments: string;
    country: string;
    created_on: string;
    email: string;
    id: string;
    mobile: string;
    name: string;
}

export default function useHelpCenter() {
    const {
        data: helpCenters,
        mutate: mutateHelpCenter,
        isLoading: helpCenterIsLoading,
        error: helpCenterError,
    } = useSWR<AxiosResponse<IHelpCenter[]>>(`/api/help-center`, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        revalidateIfStale: true,
        revalidateOnMount: true,
    });

    return {
        helpCenters,
        mutateHelpCenter,
        helpCenterIsLoading,
        helpCenterError,
    };
}
