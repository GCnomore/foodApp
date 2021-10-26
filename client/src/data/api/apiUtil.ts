import axios from "axios";

const getFoodTrivia = async () => {
  const trivia: string = await axios({
    method: "GET",
    url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random",
    headers: {
      "x-rapidapi-key": "80c5024537mshda9eb5674d6ffbcp1cd8a6jsn7de3a31beb98",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  }).then((res) => res.data.text);
  sessionStorage.setItem("trivia", trivia);
  console.log("getFoodTrivia");
};
