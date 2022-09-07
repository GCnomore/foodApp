"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONST = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.CONST = {
    PORT: 3030,
    API_URL: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    API_KEY: process.env.API_KEY,
};
