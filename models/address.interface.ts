interface IAddress {
  id: number;
  tag: string;
  address_1: string;
  address_2: string;
  country: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  status: string;
}
interface IAddressProps {
  id_addresses?: number;
  tag_addresses: string;
  address_1_addresses: string;
  address_2_addresses: string;
  country_addresses: string;
  city_addresses: string;
  state_addresses: string;
  pincode_addresses: string;
  phone_addresses: number;
  default_addresses: string | null;
  status_addresses: 0 | 1;
}
export type { IAddress, IAddressProps };
