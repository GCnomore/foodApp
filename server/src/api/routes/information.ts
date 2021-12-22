import axios, { AxiosRequestConfig } from "axios";
import { Router } from "express";
import { CONST } from "../../constants";
import Logger from "../../loaders/logger";

const route = Router();

export default function Information(app: Router) {
  app.use("/information", route);

  route.get("/foodTrivia", (req, res) => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random",
      headers: {
        "x-rapidapi-key": CONST.API_KEY ?? "",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };
    Logger.info("call trivia");

    axios(config)
      .then(function (response) {
        Logger.info("received trivia");
        res.status(200).send(response.data.text);
      })
      .catch(function (error) {
        Logger.error("error getting trivia");
        console.log(error);
        res.status(400).send(new Error(error));
      });
  });
}
