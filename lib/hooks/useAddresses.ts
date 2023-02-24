import useSWR from "swr";
import { IAddressProps } from "@/models/address.interface";

export default function useAddresses(props: {
  user_id?: string | undefined;
  id?: number | undefined;
}) {
  let queryString = "";
  if (props?.user_id || props?.id) {
    queryString += "?";
  }
  if (props?.user_id) {
    queryString += `user=${props?.user_id}`;
  }
  if (props?.user_id && props.id) {
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
