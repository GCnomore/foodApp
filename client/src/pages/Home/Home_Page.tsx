import { useEffect, useRef, useState } from "react";
import * as Home from "./Home_Styled";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  addIngredients,
  getFoodTrivia,
  setFoodTrivia,
  setSearchBy,
} from "../../redux/slice/searchSlice";

import { AppDispatch, RootState } from "../../redux/store";
import IngredientBox from "../../components/Ingredient_Box/Ingredient_Box";
import SearchByModal from "../../components/Search_By_Modal/Search_By_Modal";
import LoadingComponent from "../../components/Loading/Loading_Component";
import SEARCH_BUTTON from "../../components/Search_Button/Search_Button";

const HomePage: React.FC = () => {
  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [_isModalOpen, _setIsModalOpen] = useState(false);
  const [_showLoading, _setShowLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { searchBy, ingredients, foodTrivia } = useSelector(
    (state: RootState) => state.search
  );

  useEffect(() => {
    sessionStorage.getItem("trivia") &&
    sessionStorage.getItem("trivia") !== "..."
      ? dispatch(setFoodTrivia(sessionStorage.getItem("trivia")))
      : dispatch(getFoodTrivia());
  }, [dispatch]);

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
        isModalOpen={_isModalOpen}
        setIsModalOpen={_setIsModalOpen}
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
              <button onClick={() => _setIsModalOpen(true)}>
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

            <SEARCH_BUTTON
              isSearchDisabled={isSearchDisabled}
              setShowLoading={_setShowLoading}
            />
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
      {_showLoading && <LoadingComponent />}
    </Home.HomeContainer>
  );
};

export default HomePage;
