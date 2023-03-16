
class APIResponse<T> {
  // carries list of data objects or string array for updated ids
  data?: T[] | null | string[];

  // message from backend
  msg?: string;

  // response status codes
  statusCode?: number;

  // response ok
  ok?: boolean;

  // count of object or strings in data
  count?: number;
}

export { APIResponse };
