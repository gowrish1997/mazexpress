import next from "next";
// import { MazDataSource } from "./lib/adapter/data-source";
import { MazDataSource } from "./lib/adapter/data-source.zwei";

import { IncomingMessage, ServerResponse } from "http";

const dev = process.env.NODE_ENV != "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {});

const nextHandler = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  return handle(req, res); // handles the request with NextJS
};

export default nextHandler
