import { Router } from "express";
import Logger from "../loaders/logger";

import Information from "./routes/information";
import Recipes from "./routes/recipes";

export default function AppRouters() {
  const app: Router = Router();
  Recipes(app);
  Information(app);

  Logger.info("routers injected");
  return app;
}
