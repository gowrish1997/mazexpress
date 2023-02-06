import useSWR from "swr";
import { IAddressProps } from "@/models/address.interface";

export default function useAddresses({
  userId,
  id,
}: {
  userId: number | undefined;
  id?: number | undefined;
}) {
  const {
    data: addresses,
    mutate: mutateAddresses,
    isLoading: addressesIsLoading,
  } = useSWR<IAddressProps[]>(`/api/addresses?user=${userId}`);

  return { addresses, mutateAddresses, addressesIsLoading };
}
