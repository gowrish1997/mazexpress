import { QS } from "@/components/common/QS";
//==========================
//     written by: raunak
//==========================

import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/order.model";
import { User } from "@/models/user.model";
import useSWR from "swr";

interface IProps {
  email?: string;
  search?: string;
  city?: string[];
  date?: string;
  age?: string[];
  gender?: string[];
  include_admins?: boolean;
  include_users?: boolean;
}
export default function useUserCount(props: IProps) {
  const qs = new QS(props);

  const {
    data: userCount,
    mutate: mutateUserCount,
    isLoading: userCountIsLoading,
    error: userCountError,
  } = useSWR<APIResponse<User>>(`/api/users/count` + qs.stringified);

  return {
    userCount: userCount?.count,
    mutateUserCount,
    userCountIsLoading,
    userCountError,
  };
}
