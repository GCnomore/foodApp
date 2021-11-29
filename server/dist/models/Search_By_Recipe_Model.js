"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSearchByRecipe = void 0;
var toSearchByRecipe = function (data) {
    return {
        id: data.id,
        title: data.title,
        image: data.image,
        missedIngredients: data.missedIngredients,
        usedIngredients: data.usedIngredients,
        unusedIngredients: data.unusedIngredients,
        likes: data.likes,
    };
};
exports.toSearchByRecipe = toSearchByRecipe;
