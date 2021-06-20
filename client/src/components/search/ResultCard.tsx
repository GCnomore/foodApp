import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Props } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { SearchResultInterface } from "./SearchResult";

interface ResultCardProps {
  searchResult: SearchResultInterface[] | undefined;
}

const ResultCard = ({ searchResult }: ResultCardProps): JSX.Element => {
  console.log(searchResult);

  const renderCard = () => {
    return searchResult?.map((item, index) => {
      return (
        <Card key={index} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={item.image} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <CardBody>
              {item.missedIngredientCount === 0
                ? "You've got all you need!"
                : renderMissingIngreds(item)}
            </CardBody>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      );
    });
  };

  const renderMissingIngreds = (item: SearchResultInterface) => {
    return (
      <MissingIngredientsContainer>
        <span>Missing ingredients</span>
        <ul>
          {item.missedIngredients.map((ingred, index) => (
            <li key={index}>
              <FontAwesomeIcon icon={faTimes} />
              &nbsp;
              {ingred.name}
            </li>
          ))}
        </ul>
      </MissingIngredientsContainer>
    );
  };

  if (searchResult) {
    return <ResultCardContaier>{renderCard()}</ResultCardContaier>;
  } else {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
};

export default ResultCard;

const ResultCardContaier = styled.div`
  display: flex;
`;

const CardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
`;

const MissingIngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;

  > ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
    > li {
      margin: 0.5rem 1rem 0 0;

      > svg {
        color: red;
      }
    }
  }
`;
