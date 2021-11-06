import styled from "styled-components/macro";

export const SearchResultContainer = styled.main`
  margin-top: 5%;
`;

export const SearchBarSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0 2rem 0;

  > div:first-child {
    width: 30%;
    height: 3rem;

    > input {
      height: 100%;
      width: 70%;
      border-radius: 5px;
      border: none;
      padding: 0 0.5rem;
    }

    > button {
      height: 100%;
      border-radius: 5px;
      width: 15%;
      outline: none;
    }
  }

  > button {
    border-radius: 5px;
    height: 3rem;
    width: 30%;
    margin-top: 1rem;
  }
`;

export const IngredientsContainer = styled.div`
  display: flex;
  padding: 1rem 0;

  > ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;

    > li {
      margin: 0 0.5rem;

      &:hover {
        transition: 0.5s ease-in-out;
        background-color: white;
        cursor: pointer;
      }
    }
  }
`;

export const ToggleFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 1.5rem;
  }

  > div:nth-child(2) {
    display: flex;
  }
`;

export const ResultSection = styled.section`
  display: flex;
  padding: 0 25rem;
`;

export const FilterButton = styled.button<{ $selected: boolean }>`
  background-color: ${({ $selected }) => ($selected ? "#a144d5" : "#848485")};
  transition: 0.3s ease-in-out;
  color: white;
  padding: 0.25rem 0.5rem;
  margin: 0.5rem 0.1rem;
  border: none;
`;
