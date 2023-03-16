
export enum City {
  I = "istanbul",
}

export enum WarehouseStatus {
  A = "active",
  I = "inactive",
}

export interface Warehouse {

  id: string;

  address_1: string;

  address_2: string;

  city: string;

  country: string;

  phone: number | null;

  tag: string;

  status: string;
}
