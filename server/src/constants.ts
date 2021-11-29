import dotenv from "dotenv";

dotenv.config();

export const CONST = {
  PORT: 3030,
  API_URL: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  API_KEY: process.env.API_KEY,
};
