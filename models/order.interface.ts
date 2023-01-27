interface IOrder {
  id: string;
  mazTrackingId: string;
  storeLink: string;
  referenceId: string;
  estimateDelivery: string;
  address: string;
  status: string;
}

export type { IOrder };
