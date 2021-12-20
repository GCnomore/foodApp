import IRecipeInformation, {
  IAnalyzedInstructions,
} from "../interfaces/Recipe_Information";

export const toRecipeInformation = (data: any): IRecipeInformation => {
  let equipments: null | string[] = [];
  let analyzedInstructions: null | IAnalyzedInstructions;

  if (data.analyzedInstructions.length === 0) {
    equipments = null;
    analyzedInstructions = null;
  } else {
    analyzedInstructions = data.analyzedInstructions[0].steps;

    for (let i = 0; i < data.analyzedInstructions[0].steps.length; i++) {
      if (data.analyzedInstructions[0].steps[i].equipment.length !== 0) {
        for (
          let ii = 0;
          ii < data.analyzedInstructions[0].steps[i].equipment.length;
          ii++
        ) {
          equipments.push(
            data.analyzedInstructions[0].steps[i].equipment[ii].name
          );
        }
      }
    }
  }

  return {
    id: data.id,
    title: data.title,
    image: data.image,
    cusines: data.cusines,
    readyInMinutes: data.readyInMinutes,
    vegitarian: data.vegitarian,
    vegan: data.vegan,
    glutenFree: data.glutenFree,
    dairyFree: data.dairyFree,
    veryPopular: data.veryPopular,
    ketogenic: data.ketogenic,
    whole30: data.whole30,
    servings: data.servings,
    sourceName: data.sourceName,
    sourceUrl: data.sourceUrl,
    spoonacularSourceUrl: data.spoonacularSourceUrl,
    spoonacularScore: data.spoonacularScore,
    extendedIngredients: data.extendedIngredients,
    summary: data.summary,
    dishTypes: data.dishTypes,
    diets: data.diets,
    occasions: data.occasions,
    equipments: Array.from(new Set(equipments)),
    winePairing: {
      pairedWines: data.winePairing.pairedWines,
      pairingText: data.winePairing.pairingText,
    },
    instructions: data.instructions,
    analyzedInstructions,
  };
};
