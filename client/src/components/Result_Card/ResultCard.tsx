import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Spinner } from "react-bootstrap";
import { SearchResultInterface } from "../../data/interfaces/Search_Result";
import { CardBody, MissingIngredientsContainer } from "./Result_Card_Styled";

interface ResultCardProps {
  searchResult: SearchResultInterface | undefined;
}

const ResultCard = ({ searchResult }: ResultCardProps): JSX.Element => {
  const renderMissingIngreds = (item: SearchResultInterface | undefined) => {
    console.log(item?.missedIngredients);
    return (
      <MissingIngredientsContainer>
        <span>Missing ingredients</span>
        <ul>
          {item?.missedIngredients.map((ingred, index) => (
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
