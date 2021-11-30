import { NextFunction, Request, Response, Router } from "express";
import axios, { AxiosRequestConfig } from "axios";
import { CONST } from "../../constants";
import Logger from "../../loaders/logger";

const route = Router();

export default function Recipes(app: Router) {
  app.use("/recipes", route);

  route.post("/findByIngredients", (req: Request, res: Response) => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `${CONST.API_URL}/recipes/findByIngredients`,
      params: {
        ingredients: req.body?.join(","),
        number: "5",
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
        Logger.error("error getting recipes by ingredients");
        res.end();
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
        res.status(200).send(response.data);
      })
      .catch(function (error) {
        Logger.error("error getting recipe information");
        res.end();
      });
  });
}
