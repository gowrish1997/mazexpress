import useSWR from "swr";
import { IUser } from "@/models/user.interface";

export default function useAllUser(props: { user_id?: number | undefined }) {
  let queryString = "";
  if (props?.user_id) {
    queryString += `?id=${props.user_id}`;
    const {
      data: allUser,
      mutate: mutateAllUser,
      isLoading: allUserIsLoading,
      error: error,
    } = useSWR<IUser | undefined>(`/api/users` + queryString, {
      // revalidateIfStale: true,
      // revalidateOnFocus: true,
      // revalidateOnReconnect: true,
    });

    return { allUser, mutateAllUser, allUserIsLoading, error };
  } else {
    const {
      data: allUser,
      mutate: mutateAllUser,
      isLoading: allUserIsLoading,
      error: error,
    } = useSWR<IUser[] | undefined>(`/api/users` + queryString, {
      // revalidateIfStale: true,
      // revalidateOnFocus: true,
      // revalidateOnReconnect: true,
    });

    return { allUser, mutateAllUser, allUserIsLoading, error };
  }
}
