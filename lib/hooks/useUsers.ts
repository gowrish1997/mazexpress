import { data } from "@/components/admin/MazStats/StatGraph";
import { QS } from "@/components/common/QS";
import { APIResponse } from "@/models/api.model";
import { User } from "@/models/user.model";
import useSWR from "swr";

interface IProps {
  username?: string;
  search?: string;
  page?: number;
  per_page?: number;
  include_admins?: boolean;
  include_users?: boolean;
  age?: number[];
  gender?: string[];
  date?: string;
}
export default function useUsers(props: IProps) {
  const qs = new QS(props);

  const {
    data: users,
    mutate: mutateUsers,
    isLoading: usersIsLoading,
    error: usersError,
  } = useSWR<APIResponse<User>>(`/api/users` + qs.stringified, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    revalidateOnMount: true,
  });

  return {
    users: users,
    mutateUsers,
    usersIsLoading,
    usersError,
  };
}
