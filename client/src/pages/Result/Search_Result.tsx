import ResultCard from "../../components/ResultCard";
import { useLocation } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { UrlObject } from "url";
import { Button, Spinner } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import {
  FilterButton,
  FilterContainer,
  IngredientsContainer,
  ResultContainer,
  SearchBarContainer,
  SearchContainer,
  SearchResultContainer,
} from "./Search_Result_Styled";

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
  const params: UrlObject = useLocation();
  const [showLoading, setShowLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResultInterface[]>();
  const [userInput, setUserInput] = useState<string>("");
  const [filter, setFilter] = useState({
    noMissing: false,
    vegan: false,
    vegitarian: false,
    glutenFree: false,
    dairyFree: false,
    cuisine: [],
    dishType: [],
  });
  const [ingredients, setIngredients] = useState<string[] | undefined>(
    params.pathname?.slice(8).split("&")
  );
  console.log("filters:", params.search);
  console.log("ingreds:", ingredients);

  useEffect(() => {
    const searchData: string | null = localStorage.getItem(
      "searchbyingredients"
    );
    if (searchData) {
      console.log(JSON.parse(searchData));
      setSearchResult(JSON.parse(searchData));
    }
    // searchRecipes();
  }, []);

  const searchRecipes = (): void => {
    setShowLoading(true);
    const options: AxiosRequestConfig = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients", // rapid api
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
        localStorage.setItem(
          "searchbyingredients",
          JSON.stringify(response.data)
        );
        setSearchResult(response.data);
        setShowLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <SearchResultContainer>
      <SearchBarContainer>
        <SearchContainer>
          <input
            placeholder="Add ingredients"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                ingredients && setIngredients([...ingredients, userInput]);
                setUserInput("");
              }
            }}
          />
          <Button variant="primary" onClick={() => searchRecipes()}>
            Search
          </Button>
        </SearchContainer>
        <FilterContainer>
          <div>
            <h2>Filter</h2>
          </div>
          <div>
            <FilterButton
              $selected={filter.noMissing}
              onClick={() =>
                setFilter({ ...filter, noMissing: !filter.noMissing })
              }
            >
              No missing Ingredients
            </FilterButton>
            <FilterButton
              $selected={filter.vegan}
              onClick={() => setFilter({ ...filter, vegan: !filter.vegan })}
            >
              Vegan
            </FilterButton>
            <FilterButton
              $selected={filter.vegitarian}
              onClick={() =>
                setFilter({ ...filter, vegitarian: !filter.vegitarian })
              }
            >
              Vegitarian
            </FilterButton>
            <FilterButton
              $selected={filter.glutenFree}
              onClick={() =>
                setFilter({ ...filter, glutenFree: !filter.glutenFree })
              }
            >
              Gluten Free
            </FilterButton>
            <FilterButton
              $selected={filter.dairyFree}
              onClick={() =>
                setFilter({ ...filter, dairyFree: !filter.dairyFree })
              }
            >
              Dairy Free
            </FilterButton>
            {/* <button >Cuisine</button> */}
            {/* <button>Dish Type</button> */}
          </div>
        </FilterContainer>
        <IngredientsContainer>
          <ul>
            {ingredients?.map((item) => (
              <li
                onClick={() => {
                  const newIngredients = ingredients.filter(
                    (ingred) => ingred !== item
                  );
                  setIngredients(newIngredients);
                }}
              >
                {`${item.charAt(0).toUpperCase()}` + `${item.slice(1)}`}
              </li>
            ))}
          </ul>
        </IngredientsContainer>
      </SearchBarContainer>
      <ResultContainer>
        {showLoading ? (
          <div>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          searchResult?.map((item, index) => (
            <ResultCard key={index} searchResult={item} />
          ))
        )}
      </ResultContainer>
    </SearchResultContainer>
  );
};

export default SearchResult;
