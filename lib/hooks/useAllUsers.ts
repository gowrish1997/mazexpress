import useSWR from "swr";
import { IUser } from "@/models/user.interface";

interface IProps {
  user_id?: number;
  search?: string;
  page?: number;
  per_page?: number;
  status?: string[];
  date_offset?: string;
  // future warehouse addition
}

export default function useAllUser(props: IProps) {
  let queryString = "";

  queryString += `?page=${props.page !== undefined ? props.page : 0}&per_page=${
    props.per_page !== undefined ? props.per_page : 20
  }`;

  if (props?.user_id) {
    queryString += `&id=${props.user_id}`;
  }

  // if (props?.search) {
  //   queryString += `&search=${props.search}`;
  // }

  const {
    data: allUser,
    mutate: mutateAllUser,
    isLoading: allUserIsLoading,
    error: error,
  } = useSWR(`/api/users` + queryString, {
    refreshInterval: 3000,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return { allUser, mutateAllUser, allUserIsLoading, error };
}
