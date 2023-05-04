import { Address } from "./address.model";
import { Tracking } from "./tracking.model";
import { User } from "./user.model";

export enum OrderStatus {
    I = "in-transit",
    D = "delivered",
    A = "at-warehouse",
    P = "pending",
}

export interface Order {
    id: string;

    maz_id: string;

    reference_id: string;

    shipping_amt: number;
    order_weight: number;

    created_on: Date;

    shipped_on: Date;

    delivered_on: Date;
    est_delivery: Date;

    received_on: Date;

    status: string;

    store_link: string;

    user: User;

    address: Address;

    tracking: Tracking[];
}
