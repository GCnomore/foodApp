import { useContext } from "react";
import styled from "styled-components/macro";
import { Search } from "../context/SearchContext";

interface Props {
  ingredients: string[];
}

const SearchResult: React.FC = () => {
  console.log("search", useContext(Search));
  return (
    <SearchResultContainer>
      <SearchBarContainer>ddddd</SearchBarContainer>
    </SearchResultContainer>
  );
};

export default SearchResult;

const SearchResultContainer = styled.main`
  margin-top: 10rem;
`;

const SearchBarContainer = styled.div`
  width: 100%;
  height: 2.5rem;
  background-color: yellow;
`;
