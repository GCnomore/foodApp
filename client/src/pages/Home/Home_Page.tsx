import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Home from "./Home_Styled";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FilterModal from "../../components/Filter_Modal/Filter_Modal";
import ROUTES from "../../routers/Routers";
import {
  addIngredients,
  getFoodTrivia,
  SearchState,
  removeIngredients,
  setFoodTrivia,
  setSearchBy,
  setShowFilter,
  getRecipeByIngredients,
  getRecipeInformation,
} from "../../redux/slice/searchSlice";
import _ from "lodash";
import store, { AppDispatch, RootState } from "../../redux/store";
import IngredientBox from "../../components/Ingredient_Box/Ingredient_Box";
import SearchByModal from "../../components/Search_By_Modal/Search_By_Modal";
import { isFulfilled } from "@reduxjs/toolkit";
import LoadingComponent from "../../components/Loading/Loading_Component";

const HomePage: React.FC = () => {
  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const {
    search,
    searchBy,
    showFilter,
    ingredients,
    checkFilters,
    excludes,
    foodTrivia,
    recipeByIngredient,
  } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    sessionStorage.getItem("trivia")
      ? dispatch(setFoodTrivia(sessionStorage.getItem("trivia")))
      : dispatch(getFoodTrivia());
  }, []);

  // TODO: limit ingredients to 20
  const handleSearch = async () => {
    setShowLoading(true);
    const action = await dispatch(getRecipeByIngredients(ingredients));
    if (isFulfilled(action)) {
      const id = action.payload.map((item) => item.id.toString());
      const recipeInfo = await dispatch(getRecipeInformation(id ?? []));
      if (isFulfilled(recipeInfo)) {
        console.log("fullfilled");
        setShowLoading(false);
        history.push(ROUTES.RESULT_PAGE, ingredients);
      }
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      !ingredients.includes(searchInputRef.current.value)
    ) {
      dispatch(addIngredients(searchInputRef.current.value));
      searchInputRef.current.value = "";
    }
  };

  const isSearchDisabled =
    ingredients?.length === 0 && searchInputRef.current?.value === ""
      ? true
      : false;

  return (
    <Home.HomeContainer>
      <SearchByModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setSearchBy={setSearchBy}
      />
      <Home.ContentsContainer>
        <Home.TopSection>
          <Home.TitleContainer>
            <h1>App Title</h1>
          </Home.TitleContainer>
          <Home.SearchContainer>
            <div>
              <span>Search by: </span>
              <button onClick={() => setIsModalOpen(true)}>
                {_.upperFirst(searchBy)}
              </button>
            </div>

            <div>
              <input
                ref={searchInputRef}
                placeholder={
                  searchBy === "ingredients" ? "Add your ingredients" : "Search"
                }
                onKeyDown={(e) => {
                  handleEnter(e);
                }}
              />
              {searchBy === "name" ? (
                <></>
              ) : (
                <button onClick={() => dispatch(setShowFilter(true))}>
                  Filter
                </button>
              )}
              <FilterModal />
            </div>
            {searchBy === "name" ? (
              <></>
            ) : (
              <Home.IngredientsContainer>
                <span>Your ingredients:</span>
                <ul>
                  {ingredients?.map((item, index) => (
                    <IngredientBox
                      key={`h${index}`}
                      index={index}
                      item={item}
                    />
                  ))}
                </ul>
              </Home.IngredientsContainer>
            )}

            <button disabled={isSearchDisabled} onClick={handleSearch}>
              Search
            </button>
            <button>Get random</button>
          </Home.SearchContainer>
          <Home.FoodTriviaContainer>
            <h2>Did you know?</h2>
            <span>{foodTrivia ? `"${foodTrivia}"` : "..."}</span>
          </Home.FoodTriviaContainer>
        </Home.TopSection>
        {/*//! Need DB to implement this  */}
        {/* <BottomSection>
          <RankingContainer>
            <div>
              <h3>Most searched ingredients this week</h3>
            </div>
            <div>
              <h3>Most viewed recipes this week</h3>
            </div>
          </RankingContainer>
        </BottomSection> */}
      </Home.ContentsContainer>
      {showLoading && <LoadingComponent />}
    </Home.HomeContainer>
  );
};

export default HomePage;
