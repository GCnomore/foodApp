import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Spinner } from "react-bootstrap";
import IRecipeInformation from "../../data/interfaces/Recipe_Information";
import IRecipeByIngredient from "../../data/interfaces/Search_By_Recipe";
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
  const renderMissingIngreds = (recipeByIngredient: IRecipeByIngredient) => {
    return (
      <MissingIngredientsContainer>
        <span>Missing ingredients</span>
        <ul>
          {recipeByIngredient?.missedIngredients.map((ingred, index) => (
            <li key={index}>
              <FontAwesomeIcon icon={faTimes} />
              &nbsp;
              {`${ingred.name[0].toUpperCase()}` + `${ingred.name.slice(1)}`}
            </li>
          ))}
        </ul>
      </MissingIngredientsContainer>
    );
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
        <Button variant="primary">See details</Button>
      </Card.Body>
    </ResultCardContainer>
  );
};

export default ResultCard;
