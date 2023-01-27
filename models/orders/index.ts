export interface IOrderDetail {
    id: string;
    mazTrackingId: string;
    storeLink: string;
    referenceId: string;
    estimateDelivery: string;
    address: string;
    status: string;
}

export interface IUserAddress {
    id: string;
    tag: string;
    address_1: string;
    address_2: string;
    country: string;
    city: string;
    state: string;
    pincode: string;
    phone: number;
    default: string | null;
}
