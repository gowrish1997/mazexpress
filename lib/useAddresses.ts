import useSWR from "swr";
import { IAddressProps } from "@/models/address.interface";

export default function useAddresses({
  userId,
  id,
}: {
  userId: number | undefined;
  id?: number | undefined;
}) {

  let queryString = "";
  
  if (userId || id) {
    queryString += "?";
  }

  if (userId) {
    queryString += `user=${userId}`;
  }

  if (userId && id) {
    queryString += `&`;
  }

  if (id) {
    queryString += `id=${id}`;
  }

  const {
    data: addresses,
    mutate: mutateAddresses,
    isLoading: addressesIsLoading,
  } = useSWR<IAddressProps[]>(`/api/addresses` + queryString);

  return { addresses, mutateAddresses, addressesIsLoading };
}
