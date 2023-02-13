import useSWR from "swr";
import { IAddressProps } from "@/models/address.interface";

export default function useAddresses(props: {
  userId?: number | undefined;
  id?: number | undefined;
}) {
  let queryString = "";
  if (props?.userId || props?.id) {
    queryString += "?";
  }
  if (props?.userId) {
    queryString += `user=${props?.userId}`;
  }
  if (props?.userId && props.id) {
    queryString += `&`;
  }
  if (props?.id) {
    queryString += `id=${props?.id}`;
  }

  const {
    data: addresses,
    mutate: mutateAddresses,
    isLoading: addressesIsLoading,
  } = useSWR<IAddressProps[]>(`/api/addresses` + queryString);

  return { addresses, mutateAddresses, addressesIsLoading };
}
