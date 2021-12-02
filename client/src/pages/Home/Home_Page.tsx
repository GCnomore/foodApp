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

const HomePage: React.FC = () => {
  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const history = useHistory();
  const [searchReady, setSearchReady] = useState(false);

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
  const handleSearch = () => {
    history.push(ROUTES.RESULT_PAGE, ingredients);
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
      <Home.ContentsContainer>
        <Home.TopSection>
          <Home.TitleContainer>
            <h1>App Title</h1>
          </Home.TitleContainer>
          <Home.SearchContainer>
            <Dropdown drop="up">
              <Home.DropDownToggle variant="secondary" id="dropdown-basic">
                {searchBy === "" ? (
                  <span>Search By</span>
                ) : (
                  <span>Search by {_.capitalize(searchBy)}</span>
                )}
              </Home.DropDownToggle>

              <Home.DropDownMenu>
                <Dropdown.Item
                  href="#/ingredients"
                  onSelect={(e) => {
                    dispatch(setSearchBy(e?.substring(2) || ""));
                  }}
                >
                  by Ingredient
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/name"
                  onSelect={(e) => {
                    dispatch(setSearchBy(e?.substring(2) || ""));
                  }}
                >
                  by Name
                </Dropdown.Item>
              </Home.DropDownMenu>
            </Dropdown>

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
    </Home.HomeContainer>
  );
};

export default HomePage;
