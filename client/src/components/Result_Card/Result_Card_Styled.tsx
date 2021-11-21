import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export const CardBody = styled(Card.Body)`
display: flex;
flex-direction: column;
`;

export const MissingIngredientsContainer = styled.div`
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
