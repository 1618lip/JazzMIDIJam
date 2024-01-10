import path from "node:path";
import url from "url";

import express from "express";

import "dotenv/config";

import db from "./db/client.js";
import { setup } from "./db/setup.js";

import midi from "./routes/midi.js";

const app = express();

app.use(express.json());

app.use(
  express.static(
    path.join(url.fileURLToPath(new URL(".", import.meta.url)), "../", "public")
  )
);

app.use("/api/midi", midi);

(async () => {
  await db.connect();
  await setup();

  app.use((req, res, next) => {
    console.log(req);

    const err = new Error("Not Found");
    err.status = 404;

    next(err);
  });

  app.use((err, _req, res) => {
    res.locals.message = err.message;
    res.locals.error = err;

    res.status(err.status || 500);
    res.render("error");
  });
})();

export { app };
