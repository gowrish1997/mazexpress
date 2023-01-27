import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { IAddressProps } from "@/models/address.interface";

export default function useAddresses(id: number | undefined) {
  const { data: addresses, mutate: mutateAddresses } = useSWR<IAddressProps[]>(
    `/api/addresses?user=${id}`
  );

  return { addresses, mutateAddresses };
}
