interface IWarehouse {
    id: number,
    tag: string,
    address_1: string,
    address_2: string,
    country: string,
    city: string,
    state: string,
    pincode: string,
    phone: string,
    status: string,
}
interface IWarehouseProps {
    id_warehouses: string;
    tag_warehouses: string;
    address_1_warehouses: string;
    address_2_warehouses: string;
    country_warehouses: string;
    city_warehouses: string;
    state_warehouses: string;
    pincode_warehouses: string;
    phone_warehouses: number;
    status_warehouses: string;
  }
export type {
    IWarehouse,
    IWarehouseProps
}