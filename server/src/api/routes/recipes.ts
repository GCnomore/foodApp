import { NextFunction, Request, Response, Router } from "express";
import axios, { AxiosRequestConfig } from "axios";
import { CONST } from "../../constants";
import Logger from "../../loaders/logger";
import IRecipeInformation from "../../interfaces/Recipe_Information";
import { toRecipeInformation } from "../../models/Recipe_Information";

const route = Router();

export default function Recipes(app: Router) {
  app.use("/recipes", route);

  route.post("/findByIngredients", (req: Request, res: Response) => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `${CONST.API_URL}/recipes/findByIngredients`,
      params: {
        ingredients: req.body?.join(","),
        number: "50",
        ignorePantry: "true",
        ranking: "1",
      },
      headers: {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": CONST.API_KEY ?? "",
      },
    };
    Logger.info(`find by ingredients ${req.body}`);

    axios(config)
      .then(function (response) {
        Logger.info("received recipes by ingredients");
        res.status(200).send(response.data);
      })
      .catch(function (error) {
        Logger.error("error getting recipes by ingredients", error);
        res.status(400).send(new Error(error));
      });
  });

  route.post("/recipeInformation", (req: Request, res: Response) => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk",
      params: { ids: req.body.ids },
      headers: {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": CONST.API_KEY ?? "",
      },
    };
    Logger.info("get recipe information", req.body.ids);

    axios(config)
      .then(function (response) {
        Logger.info("received recipe information");
        const recipeInformation: IRecipeInformation[] = response.data.map(
          (data: any) => toRecipeInformation(data)
        );
        res.status(200).send(recipeInformation);
      })
      .catch(function (error) {
        Logger.error("error getting recipe information", error);
        res.status(400).send(new Error(error));
      });
  });
}
