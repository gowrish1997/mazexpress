import { IOrderResponse } from "./order.interface";
export interface IProp {
    content: string;
    title?: string;
    onChangeStatus?: (value: string[]) => void;
    itemPerPageHandler?: (value: string | number) => void;
    selectedOrder?: string[];
    allLiveOrders: IOrderResponse[];
    filterByDate: (value: Date | string) => void;
    pageCount: number;
    currentPageHandler: (value: number) => void;
    itemsPerPage: number;
    currentPage: number;
    statusFilterKey?: string[];
}