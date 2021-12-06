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
        <Recipe.MetaContainer>
          <h1>{recipeInformation.title}</h1>
          <Recipe.InformationContainer>
            <div>
              <ul>
                <span>Ingredients:</span>
                <span>{ingredients}</span>
              </ul>
              <ul>
                <span>Equipments:</span>
                <span>{equipments}</span>
              </ul>
            </div>
          </Recipe.InformationContainer>
          <Recipe.AdditionalInfoContainer>
            <div>
              <ul>
                <span>Diets:</span>
                <span>{recipeInformation.diets}</span>
              </ul>
              <span>Cuisine: {recipeInformation.cusines ?? "N/A"}</span>
            </div>
            <div>
              <span>
                Spoonacular score: {recipeInformation.spoonacularScore}
              </span>
              <span>{recipeInformation.occasions}</span>
            </div>
            <div>
              <span>{recipeInformation.readyInMinutes} min.</span>
              <span>
                <button>
                  <a href={recipeInformation.sourceUrl}>Go to original</a>
                </button>
              </span>
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
