import { APIResponse } from "@/models/api.model";
import { User } from "@/models/user.model";
import useSWR from "swr";

interface IProps {
  user_id?: string;
  search?: string;
  page?: number;
  per_page?: number;
  is_admin?: boolean;
  count_all?: boolean;
  count?: boolean;
  age?: string[]
  gender?: string[]
  // future warehouse addition
}
export default function useUsers(props: IProps) {
  //   console.log('calling use orders')
  //   console.log(props.page)
  let queryString = "";
  if (!props.count_all) {
    queryString += `?page=${
      props.page !== undefined ? props.page : 0
    }&per_page=${props.per_page !== undefined ? props.per_page : 20}`;

    if (props?.user_id) {
      queryString += `&user=${props.user_id}`;
    }

    if (props?.is_admin === true) {
      queryString += `&admin=true`;
    } else {
      queryString += `&admin=false`;
    }
    if (props?.search) {
      queryString += `&search=${props.search}`;
    }

    if (props?.age) {
      queryString += `&age=${props.age}`;
    }
    
    if(props.count){
      queryString += `&count=${true}`;
    }

    if (props?.gender && props.gender.length !== 0) {
      queryString += `&gender=${props.gender}`;
    }
  } else {
    // return all order count
    queryString += "?count=all";
    if (true) {
      queryString += "&admin=true";
    } else {
      queryString += "&admin=false";
    }
  }

  const {
    data: users,
    mutate: mutateUsers,
    isLoading: usersIsLoading,
    error: usersError,
  } = useSWR<APIResponse<User>>(`/api/users` + queryString);

  return {
    users: props.count ? users?.count : (users?.data as User[]),
    mutateUsers,
    usersIsLoading,
    usersError,
  };
}
