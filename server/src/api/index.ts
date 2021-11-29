import { Router } from "express";
import Information from "./routes/information";
import Recipes from "./routes/recipes";

export default () => {
  const app: Router = Router();
  console.log("api router");
  Recipes(app);
  Information(app);

  return app;
};
