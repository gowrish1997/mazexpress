import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { IAddressProps } from "@/models/address.interface";

export default function useAddresses({
  userId,
  id,
}: {
  userId: number | undefined;
  id?: number | undefined;
}) {
  if (userId !== null && userId !== undefined) {
    // use addresses for user
    const { data: addresses, mutate: mutateAddresses } = useSWR<
      IAddressProps[]
    >(`/api/addresses?user=${userId}`);

    return { addresses, mutateAddresses };
  }
  const { data: addresses, mutate: mutateAddresses } = useSWR<IAddressProps[]>(
    `/api/addresses?user=${userId}`
  );

  return { addresses, mutateAddresses };
}
