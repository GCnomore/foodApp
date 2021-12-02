import * as Recipe from "./Recipe_Styled";

const RecipePage: React.FC = () => {
  return (
    <Recipe.RecipePageContainer>
      <section>ad</section>
      <Recipe.ContentsContainer>
        <Recipe.ImageContainer></Recipe.ImageContainer>
        <Recipe.MetaContainer>
          <h1>Title</h1>
          <Recipe.InformationContainer>
            <div>Ingredients & equipments</div>
            <div>
              <span>Cooking time</span>
              <span>Go to original</span>
            </div>
          </Recipe.InformationContainer>
          <Recipe.AdditionalInfoContainer>
            <div>
              <span>Diets</span>
              <span>Cuisine maybe?</span>
            </div>
            <div>
              <span>Spoonacular score</span>
              <span>Occation</span>
            </div>
          </Recipe.AdditionalInfoContainer>
        </Recipe.MetaContainer>
        <Recipe.InstructionContainer></Recipe.InstructionContainer>
        <Recipe.WinePairing></Recipe.WinePairing>
      </Recipe.ContentsContainer>
      <section>ad</section>
    </Recipe.RecipePageContainer>
  );
};

export default RecipePage;
