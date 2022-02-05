import { Router } from "express";
import Logger from "../loaders/logger";

import Information from "./routes/Information";
import Recipes from "./routes/Recipes";

export default function AppRouters() {
  const app: Router = Router();
  Recipes(app);
  Information(app);

  Logger.info("routers injected");
  return app;
}
