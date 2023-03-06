"use strict";
// server.js
// import express, { Request, Response } from "express";
// import next from "next";
// import { parse } from "url";
const express = require("express");
const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT) || 3000;
const hostname = process.env.HOST || "localhost";
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
(async () => {
    try {
        await app.prepare();
        const server = express();
        server.all("*", async (req, res) => {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;
            let reqHandler = await handle(req, res, parsedUrl);
            return reqHandler;
        });
        server.listen(port, (err) => {
            if (err)
                throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
