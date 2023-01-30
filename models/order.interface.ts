interface IOrderResponse {
    id: string;
    mazTrackingId: string;
    storeLink: string;
    referenceId: string;
    estimateDelivery: string;
    address: string;
    status: string;
}
interface IOrder {
    referenceId: string;
    storeLink: string;
    address?: number;
}

export type { IOrderResponse, IOrder };
