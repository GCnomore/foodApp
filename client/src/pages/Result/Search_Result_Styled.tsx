import styled from "styled-components/macro";

export const SearchResultContainer = styled.main`
  margin-top: 10rem;
`;

export const ResultContainer = styled.section`
  display: flex;
  padding: 0 25rem;
`;

export const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > input {
    width: 40rem;
  }
`;

export const SearchContainer = styled.div``;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 1.5rem;
  }

  > div:nth-child(2) {
    display: flex;
  }
`;

export const IngredientsContainer = styled.div`
  display: flex;

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

export const FilterButton = styled.button<{ $selected: boolean }>`
  background-color: ${({ $selected }) => ($selected ? "blue" : "grey")};
  transition: 0.3s ease-in-out;
  color: white;
  padding: 0.25rem 0.5rem;
  margin: 0.5rem 0.1rem;
  border: none;
`;
