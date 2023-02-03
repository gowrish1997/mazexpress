interface IOrderResponse {
  id_orders: string;
  user_id: number;
  address_id: number;
  reference_id_orders: string;
  shipping_amt_orders: number;
  shipped_on_orders: string;
  delivered_on_orders: string;
  received_on_orders: string;
  status_orders: string;
  store_link_orders: string;
}
interface IOrder {
    referenceId: string;
    storeLink: string;
    address?: number;
 
}

export type { IOrderResponse, IOrder };
