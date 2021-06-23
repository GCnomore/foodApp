import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { SearchResultInterface } from "./SearchResult";

interface ResultCardProps {
  searchResult: SearchResultInterface | undefined;
}

const ResultCard = ({ searchResult }: ResultCardProps): JSX.Element => {
  const renderMissingIngreds = (item: SearchResultInterface | undefined) => {
    return (
      <MissingIngredientsContainer>
        <span>Missing ingredients</span>
        <ul>
          {item?.missedIngredients.map((ingred, index) => (
            <li key={index}>
              <FontAwesomeIcon icon={faTimes} />
              &nbsp;
              {`${ingred.name.charAt(0).toUpperCase()}` +
                `${ingred.name.slice(1)}`}
            </li>
          ))}
        </ul>
      </MissingIngredientsContainer>
    );
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={searchResult?.image} />
      <Card.Body>
        <Card.Title>{searchResult?.title}</Card.Title>
        <CardBody>
          {searchResult?.missedIngredientCount === 0
            ? "You've got all you need!"
            : renderMissingIngreds(searchResult)}
        </CardBody>
        <Button variant="primary">See details</Button>
      </Card.Body>
    </Card>
  );
};

export default ResultCard;

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
