
import { Order } from "./order.model";
export interface IPageHeaderProp {
    content: string;
    title?: string;
    onChangeStatus?: (value: string[]) => void;
    itemPerPageHandler?: (value: string | number) => void;
    selectedOrder?: Order[];
    allLiveOrders: Order[];
    filterByDate: (value: Date | string) => void;
    pageCount?: number;
    currentPageHandler: (value: number) => void;
    itemsPerPage: number;
    currentPage: number;
    statusFilterKey?: string[];
}