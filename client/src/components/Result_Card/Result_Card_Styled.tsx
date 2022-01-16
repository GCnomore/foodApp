import styled from "styled-components/macro";

export const ResultCardContainer = styled.div`
  width: 25rem;
  height: 35rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: calc(25rem * 0.015);
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

export const CardBody = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;

  > div {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
    flex-grow: 1;
    margin-bottom: auto;
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 0rem;
    margin-top: 0.5rem;
  }

  button {
    justify-self: flex-end;
    > a {
      color: white;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export const Diet = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  list-style: none;
  margin-bottom: 0.25rem;

  li {
    margin-right: 1rem;
    font-style: italic;
    font-size: 0.8rem;
    span {
      margin-right: 2px;
    }
  }
`;

export const AdditionalInfo = styled.section`
  display: flex;
  flex-grow: 1;
  margin-bottom: auto;
  margin-top: 1rem;
  > div {
    margin-right: 1.5rem;
  }
`;

export const MissingIngredientsContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding: 0.25rem;

  > span {
    font-weight: bold;
    margin-bottom: 1rem;
  }

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
