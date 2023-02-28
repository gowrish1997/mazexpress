interface IAddress {
  id: string;
  tag: string;
  address_1: string;
  address_2: string;
  country: string;
  city: string;
  state: string;
  phone: number;
  status: string;
}
interface IAddressProps {
  id?: string;
  tag: string;
  address_1: string;
  address_2: string;
  country: string;
  city: string;
  state: string;
  phone: number;
  default: string | null;
  status: 0 | 1;
}
export type { IAddress, IAddressProps };
