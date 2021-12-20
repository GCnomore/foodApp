import { RouteComponentProps, useLocation } from "react-router";
import _ from "lodash";
import IRecipeInformation, {
  IAnalyzedInstructions,
} from "../../data/interfaces/Recipe_Information";
import * as Recipe from "./Recipe_Styled";

const RecipePage: React.FC<RouteComponentProps> = (props) => {
  const location = useLocation<{ recipeInformation: IRecipeInformation }>();
  const recipeInformation: IRecipeInformation =
    location?.state.recipeInformation;

  const ingredients = recipeInformation.extendedIngredients.map((item) => {
    return <li>{_.upperFirst(item.name)}</li>;
  });

  const equipments = recipeInformation.equipments.map((item) => {
    return <li>{_.upperFirst(item)}</li>;
  });

  const diets = recipeInformation.diets.map((item) => {
    return <li>{_.upperFirst(item)}</li>;
  });

  const occasions =
    recipeInformation.occasions.length > 0
      ? recipeInformation.occasions.map((item) => <li>{_.upperFirst(item)}</li>)
      : "N/A";

  const cusines = recipeInformation.cusines
    ? recipeInformation.cusines.map((item) => <li>{_.upperFirst(item)}</li>)
    : "N/A";

  console.log(recipeInformation);

  const renderInstuctions = () => {
    if (
      recipeInformation.analyzedInstructions &&
      recipeInformation.analyzedInstructions.length !== 0
    ) {
      return recipeInformation.analyzedInstructions.map((item) => (
        <li>{item.step}</li>
      ));
    } else {
      return <span>{recipeInformation.instructions}</span>;
    }
  };

  return (
    <Recipe.RecipePageContainer>
      <Recipe.AdSection>ad</Recipe.AdSection>
      <Recipe.ContentsContainer>
        <Recipe.ImageContainer>
          <img src={recipeInformation.image} />
        </Recipe.ImageContainer>
        <Recipe.TitleContainer>
          <h1>{recipeInformation.title}</h1>
        </Recipe.TitleContainer>
        <Recipe.MetaContainer>
          <div>
            <div>
              <span>Time: {recipeInformation.readyInMinutes} min.</span>
            </div>
            <div>
              <button>
                <a href={recipeInformation.sourceUrl}>Go to original</a>
              </button>
            </div>
          </div>
          <Recipe.InformationContainer>
            <div>
              <span>Ingredients:</span>
              <ul>{ingredients}</ul>
            </div>
            <div>
              <span>Equipments:</span>
              <ul>{equipments}</ul>
            </div>
          </Recipe.InformationContainer>
          <Recipe.AdditionalInfoContainer>
            <div>
              <span>Diets:</span>
              <ul>{diets}</ul>
            </div>
            <div>
              <span>Occasions: </span>
              <ul>{occasions}</ul>
            </div>
            <div>
              <span>Cuisine:</span>
              <ul>{cusines}</ul>
            </div>
            <div>
              <div>
                <span>
                  Spoonacular score: {recipeInformation.spoonacularScore}
                </span>
              </div>
            </div>
          </Recipe.AdditionalInfoContainer>
        </Recipe.MetaContainer>
        <Recipe.InstructionContainer>
          <ol>{renderInstuctions()}</ol>
        </Recipe.InstructionContainer>
        <Recipe.WinePairing></Recipe.WinePairing>
      </Recipe.ContentsContainer>
      <Recipe.AdSection>ad</Recipe.AdSection>
    </Recipe.RecipePageContainer>
  );
};

export default RecipePage;
