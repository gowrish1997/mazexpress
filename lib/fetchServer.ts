//==========================
//     written by: raunak
//==========================

export default async function fetchJson<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const environment = process.env.NODE_ENV;
  if (environment === "production") {
    console.log("production fetch called");
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_DEPLOY_SERVER_HOST}` + input,
      init
    );
    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json();

    // response.ok is true when res.status is 2xx
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
    if (response.ok) {
      // console.log(data);
      return data;
    }
    throw new FetchError({
      message: response.statusText,
      response,
      data,
    });
  } else if (process.env.NEXT_PUBLIC_C4) {
    // run code for frontend dev
    console.log("c4 fetch called");
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_DEPLOY_SERVER_HOST}` + input,
      init
    );
    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json();

    // response.ok is true when res.status is 2xx
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
    if (response.ok) {
      // console.log(data);
      return data;
    }
    throw new FetchError({
      message: response.statusText,
      response,
      data,
    });
  } else {
    // console.log(process.env.NEXT_PUBLIC_SERVER_HOST, process.env.NEXT_PUBLIC_SERVER_PORT)
    console.log("dev fetch called");
    const response = await fetch(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}` +
        input,
      init
    );

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line

    const data = await response.json();

    // response.ok is true when res.status is 2xx
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
    if (response.ok) {
      // console.log(data);
      return data;
    }
    throw new FetchError({
      message: response.statusText,
      response,
      data,
    });
  }
}

export class FetchError extends Error {
  response: Response;
  data: {
    message: string;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: {
      message: string;
    };
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = "FetchError";
    this.response = response;
    this.data = data ?? { message: message };
  }
}
