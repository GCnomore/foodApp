import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router";
import IRecipeInformation from "../../data/interfaces/Recipe_Information";
import { IRecipeByIngredient } from "../../data/interfaces/Search";
import ROUTES from "../../routers/Routers";
import {
  CardBody,
  MissingIngredientsContainer,
  ResultCardContainer,
} from "./Result_Card_Styled";

interface ResultCardProps {
  recipeByIngredient: IRecipeByIngredient;
  recipeInformation: IRecipeInformation;
}

const ResultCard = ({
  recipeByIngredient,
  recipeInformation,
}: ResultCardProps): JSX.Element => {
  const history = useHistory();

  const renderMissingIngreds = (recipeByIngredient: IRecipeByIngredient) => {
    return (
      <MissingIngredientsContainer>
        <span>Missing ingredients</span>
        <ul>
          {recipeByIngredient?.missedIngredients.map((ingred, index) => (
            <li key={index}>
              <FontAwesomeIcon icon={faTimes} />
              &nbsp;
              {_.upperFirst(ingred.name)}
            </li>
          ))}
        </ul>
      </MissingIngredientsContainer>
    );
  };

  const routeToRecipe = () => {
    history.push({
      pathname: ROUTES.RECIPE_PAGE,
      search: `?id=${recipeByIngredient.id}`,
      state: { recipeInformation },
    });
  };

  return (
    <ResultCardContainer>
      <Card.Img variant="top" src={recipeByIngredient?.image} />
      <Card.Body>
        <Card.Title>{recipeByIngredient?.title}</Card.Title>
        <CardBody>
          <section>{recipeInformation.dishTypes[0]}</section>
          <section>
            {recipeByIngredient?.missedIngredients.length === 0
              ? "You've got all you need!"
              : renderMissingIngreds(recipeByIngredient)}
          </section>
        </CardBody>
        <Button variant="primary" onClick={routeToRecipe}>
          See details
        </Button>
      </Card.Body>
    </ResultCardContainer>
  );
};

export default ResultCard;
