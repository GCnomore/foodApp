import bodyParser from "body-parser";
import express, { Application, Request, Response, NextFunction } from "express";

import { CONST } from "./constants";
import loaders from "./loaders/index";

async function startServer() {
  const app: Application = express();

  await loaders({ expressApp: app });
  app.listen(CONST.PORT, () => {
    console.log(`
    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    Server is listening to port: ${CONST.PORT}
    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    `);
  });
}

startServer();
