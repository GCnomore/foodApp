import { NextFunction, Request, Response, Router } from "express";
import axios, { AxiosRequestConfig } from "axios";
import { CONST } from "../../constants";
import { ISearchByRecipe } from "../../interfaces/Search_By_Recipes";
import { toSearchByRecipe } from "../../models/Search_By_Recipe_Model";

const route = Router();

export default function Recipes(app: Router) {
  app.use("/recipes", route);

  route.post(
    "/findByIngredients",
    (req: Request, res: Response, next: NextFunction) => {
      console.log("calling");
      console.log("reqqqq", req.body.join(","));
      const options: AxiosRequestConfig = {
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

      // var options: AxiosRequestConfig = {
      //   method: "get",
      //   url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=potato,onion&number=2&limitLicense=true&ranking=1&ignorePantry=true&apiKey=0e5a3230d4054e91846f13c8657f92fa",
      //   headers: {
      //     "x-rapidapi-key": CONST.API_KEY,
      //     "x-rapidapi-host":
      //       "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      //   },
      // };

      axios(options)
        .then(function (response) {
          console.log(response.data);
          res.status(200).send(response.data);
        })
        .catch(function (error) {
          console.log(error);
          res.end();
        });
    }
  );
}
