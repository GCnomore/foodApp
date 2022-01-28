import React, { useState, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router";

import IRecipeInformation from "../../data/interfaces/Recipe_Information";
import { IRecipeByIngredient } from "../../data/interfaces/Search";
import { ROUTES } from "../../routers/Routers";
import * as Styled from "./Result_Card_Styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import Ingredients from "../../data/interfaces/Ingredients";

interface ResultCardProps {
  recipeByIngredient: IRecipeByIngredient;
  recipeInformation: IRecipeInformation;
}

const ResultCard: React.FC<ResultCardProps> = ({
  recipeByIngredient,
  recipeInformation,
}) => {
  const history = useHistory();
  const [_isVegan, _setIsVegan] = useState<boolean>(false);

  useEffect(() => {
    recipeInformation?.diets.map((item) => {
      if (item.includes("veg")) {
        _setIsVegan(true);
      }
    });
  }, [recipeInformation]);

  const renderMissingIngreds = (recipeByIngredient: IRecipeByIngredient) => {
    return (
      <Styled.MissingIngredientsContainer>
        {recipeByIngredient?.missedIngredients.length === 0 ? (
          <span>✅ You've got all you need!</span>
        ) : (
          <>
            <label>
              <FontAwesomeIcon icon={faTimes} />
              Missing ingredients:
            </label>
            <ul>
              {recipeByIngredient?.missedIngredients.map(
                (ingred: Ingredients, index: number) => (
                  <li key={index}>&bull; {_.upperFirst(ingred.name)}</li>
                )
              )}
            </ul>
          </>
        )}
      </Styled.MissingIngredientsContainer>
    );
  };

  const renderEquipments = () => {
    return (
      <Styled.EquipmentsContainer>
        <label>👨‍🍳 Equipments you need:</label>
        <ul>
          {recipeInformation.equipments.map((item: string, index: number) => (
            <li key={`${item}${index}`}>&bull; {_.upperFirst(item)}</li>
          ))}
        </ul>
      </Styled.EquipmentsContainer>
    );
  };

  // const routeToRecipe = () => {
  //   history.push({
  //     pathname: ROUTES.RECIPE_PAGE,
  //     search: `?id=${recipeByIngredient.id}`,
  //     state: { recipeInformation },
  //   });
  // };

  const renderDiets = () =>
    recipeInformation.diets.map((item, index) => (
      <li key={`diets${index}`}>
        <span>&bull;</span>
        {_.upperFirst(item)}
      </li>
    ));

  return (
    <Styled.ResultCardContainer>
      <Card.Img variant="top" src={recipeByIngredient?.image} />
      <Styled.CardBody>
        <div>
          <h2>
            {recipeByIngredient?.title}
            {_isVegan ? "🥗" : ""}
          </h2>
          <Styled.Diet>{renderDiets()}</Styled.Diet>
          <Styled.AdditionalInfo>
            <div>
              <label>⏳Time:</label>
              <span> {recipeInformation.readyInMinutes} min.</span>
            </div>
            <div>
              <label>🍽Servings:</label>
              <span> {recipeInformation.servings}</span>
            </div>
          </Styled.AdditionalInfo>
          {renderEquipments()}
          {renderMissingIngreds(recipeByIngredient)}
        </div>
        <Button variant="primary">
          <a href={recipeInformation.sourceUrl} target="_blank">
            See details
          </a>
        </Button>
      </Styled.CardBody>
    </Styled.ResultCardContainer>
  );
};

export default ResultCard;
