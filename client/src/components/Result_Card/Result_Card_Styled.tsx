import styled from "styled-components/macro";

export const ResultCardContainer = styled.div`
  width: 25rem;
  height: 40rem;
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
  position: relative;

  > div {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
    /* flex-grow: 1; */
    /* margin-bottom: auto; */
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 0rem;
    margin-top: 0.5rem;
  }

  button {
    position: absolute;
    bottom: 0;
    width: 100%;

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
  margin-top: 0.25rem;
  > div {
    margin-right: 1.5rem;
  }
`;

export const EquipmentsContainer = styled.section`
  margin: 1rem 0 0 0;

  > ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0.25rem 0 0 0;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow-x: auto;

    > li {
      margin: 0 1rem 0 0;
    }

    &::-webkit-scrollbar {
      height: 4px;
      background-color: #eee;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #2c2c2c8d;
      border-radius: 10px;
    }
  }
`;

export const MissingIngredientsContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 0.75rem;
  padding: 0.25rem;

  > span {
    font-weight: bold;
  }

  > label {
    > svg {
      color: red;
      margin-right: 0.25rem;
    }
  }

  > ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0.25rem 0 0 0;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow-x: auto;

    > li {
      margin: 0 1rem 0 0;
    }

    &::-webkit-scrollbar {
      height: 4px;
      background-color: #eee;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #2c2c2c8d;
      border-radius: 10px;
    }
  }
`;
