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
  let queryString = "";
  if (Object.keys(props).length > 0) {
    queryString += "?";
  }

  for (var i = 0; i < Object.keys(props).length; i++) {
    const field = Object.keys(props)[i];
    if (props[field as keyof typeof props] !== undefined) {
      queryString += `${field}=${props[field as keyof typeof props]}`;
      if (i !== Object.keys(props).length - 1) {
        queryString += "&";
      }
    }
  }

  //   console.log(queryString)
  const {
    data: userCount,
    mutate: mutateUserCount,
    isLoading: userCountIsLoading,
    error: userCountError,
  } = useSWR<APIResponse<User>>(`/api/users/count` + queryString);

  return {
    userCount: userCount?.count,
    mutateUserCount,
    userCountIsLoading,
    userCountError,
  };
}
