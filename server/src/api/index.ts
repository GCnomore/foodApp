import { Router } from "express";
import Recipes from "./routes/recipes";

export default () => {
  const app: Router = Router();
  console.log("api router");
  Recipes(app);

  return app;
};
