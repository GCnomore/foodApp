import ResultCard from "./ResultCard";
import { useLocation } from "react-router-dom";
import styled from "styled-components/macro";
// import { Search } from "../context/SearchContext";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { UrlObject } from "url";

interface Props {
  ingredients: string[];
}

export interface SearchResultInterface {
  id: number;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: [x: any];
  title: string;
  usedIngredientCount: number;
  usedIngredients: Object[];
}

const SearchResult: React.FC = () => {
  const [searchResult, setSearchResult] = useState<SearchResultInterface[]>();
  const params: UrlObject = useLocation();
  const ingredients: string[] | undefined = params.pathname
    ?.slice(8)
    .split("&");
  console.log("filters:", params.search);
  console.log("ingreds:", ingredients);

  useEffect(() => {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
      params: {
        ingredients: ingredients?.join(","),
        number: "5",
        ignorePantry: "true",
        ranking: "1",
      },
      headers: {
        "x-rapidapi-key": "80c5024537mshda9eb5674d6ffbcp1cd8a6jsn7de3a31beb98",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setSearchResult(response.data);
        console.log("res", response);
        console.log(searchResult);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <SearchResultContainer>
      <SearchBarContainer>
        <ResultCard searchResult={searchResult} />
      </SearchBarContainer>
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
