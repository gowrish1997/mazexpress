import { Order } from "./order.model";
import { User } from "./user.model";
import { APIResponse } from "./api.model";
import { KeyedMutator } from "swr";
export interface IPageHeaderProp {
    content: string;
    title?: string;
    onChangeStatus?: (value: string[]) => void;
    itemPerPageHandler?: (value: string | number) => void;
    selectedOrder?: Order[] | User[];
    allLiveOrders: Order[];
    filterByDate: (value: Date | string) => void;
    pageCount?: number;
    currentPageHandler: (value: number) => void;
    itemsPerPage: number;
    currentPage: number;
    statusFilterKey?: string[];
    mutateOrder?: KeyedMutator<APIResponse<Order>>;
    createdDateFilterKey?: string | Date;
    setSelectedOrder?: React.Dispatch<
        React.SetStateAction<Order[] | undefined>
    >;
    isFilterPresent?: boolean;
    sorting?: (value: string) => void;
    sortValue?:string
}
