import bodyParser from "body-parser";
import express, { Application, Request, Response, NextFunction } from "express";

import { CONST } from "./constants";
import loaders from "./loaders/index";
import Logger from "./loaders/logger";

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
  Logger.info(`server run on port ${CONST.PORT}`);

  app.get("/error", (req, res) => {
    Logger.error("Error");
    res.end();
  });
}

startServer();
