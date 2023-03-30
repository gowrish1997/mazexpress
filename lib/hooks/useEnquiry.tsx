import useSWR from "swr";
import { QS } from "@/components/common/QS";
import { APIResponse } from "@/models/api.model";

export interface IEnquiry {
    created_on: Date;
    email: string;
    id: string;
    message: string;
    mobile: string;
}

interface IProps {
    type?: string;
    username?: string;
    search?: string;
    page?: number;
    per_page?: number;
    status?: string[];
    date?: string;
}
export default function useEnquiry(props: IProps) {
    const qs = new QS(props);

    const {
        data: enquiry,
        mutate: mutateEnquiry,
        isLoading: enquiryIsLoading,
        error: enquiryError,
    } = useSWR<APIResponse<IEnquiry>>(`/api/contact-form` + qs.stringified);

    return {
        enquiry,
        mutateEnquiry,
        enquiryIsLoading,
        enquiryError,
    };
}
