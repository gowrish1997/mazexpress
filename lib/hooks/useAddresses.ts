import { APIResponse } from "@/models/api.model";
import useSWR from "swr";
import { AddressEntity } from "../adapter/entities/AddressEntity";

export default function useAddresses(props: {
  user_id?: string | undefined;
  id?: string | undefined;
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
  } = useSWR<APIResponse<AddressEntity>>(`/api/addresses` + queryString);

  return { addresses, mutateAddresses, addressesIsLoading };
}
