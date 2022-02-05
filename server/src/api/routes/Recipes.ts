import { NextFunction, Request, Response, Router } from "express";
import { IRecipeByIngredients } from "../../interfaces/Recipe_By_Ingredients";
import Logger from "../../loaders/logger";
import { findByIngredients } from "../api/Recipe_Api";
import getRecipeByIngredients from "../services/Get_Recipe_By_Ingredients";

const route = Router();

export default function Recipes(app: Router) {
  app.use("/recipes", route);

  route.post("/findByIngredients", (req: Request, res: Response) => {
    getRecipeByIngredients(req.body.ingredients, req.body.number)
      .then((result: IRecipeByIngredients[]) => {
        console.log("send it");
        if (result) {
          console.log("send success");
          res.status(200).send(result);
        } else {
          res.status(400).send({ msg: "no recipe found" });
        }
      })
      .catch((e) => {
        Logger.error(`error getting recipe by ingredients ${e}`);
      });
  });
}
