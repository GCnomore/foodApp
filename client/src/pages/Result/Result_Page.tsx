import ResultCard from "../../components/Result_Card/ResultCard";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalTitle } from "react-bootstrap";
import * as Result from "./Result_Page_Styled";
import ISearchResult from "../../data/interfaces/Search_Result";
import LoadingComponent from "../../components/Loading/Loading_Component";
import { useDispatch, useSelector } from "react-redux";
import {
  SearchState,
  removeIngredients,
  setShowFilter,
  addIngredients,
  getRecipeByIngredients,
  getRecipeInformation,
} from "../../redux/slice/searchSlice";
import FilterModal from "../../components/Filter_Modal/Filter_Modal";
import IngredientBox from "../../components/Ingredient_Box/Ingredient_Box";
import { AppDispatch, RootState } from "../../redux/store";
import IRecipeByIngredient from "../../data/interfaces/Search_By_Recipe";
import IRecipeInformation from "../../data/interfaces/Recipe_Information";
import { isFulfilled } from "@reduxjs/toolkit";

const ResultPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const { ingredients, recipeByIngredient, recipeInformation } = useSelector(
    (state: RootState) => state.search
  );

  const userInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    // getResult();
  }, [dispatch]);

  const getResult = async () => {
    setShowLoading(true);
    const action = await dispatch(getRecipeByIngredients(ingredients));
    if (isFulfilled(action)) {
      setShowLoading(false);
      const id = action.payload.map((item) => item.id.toString());
      dispatch(getRecipeInformation(id ?? []));
    }
  };

  const handleAddIngredients = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      !ingredients.includes(userInputRef.current.value)
    ) {
      userInputRef.current?.value &&
        dispatch(addIngredients(userInputRef.current.value));
      userInputRef.current.value = "";
    }
  };

  const renderResult = (
    recipeByIngredient: IRecipeByIngredient[],
    recipeInformation: IRecipeInformation[]
  ) => {
    const cards = recipeInformation.map((item, index) => {
      return (
        <ResultCard
          key={`resultC${index}`}
          recipeByIngredient={recipeByIngredient[index]}
          recipeInformation={item}
        />
      );
    });
    return cards;
  };

  console.log("result page", recipeInformation, recipeByIngredient);

  return (
    <Result.SearchResultContainer>
      <FilterModal />

      <Result.SearchBarSection>
        <div>
          <input
            ref={userInputRef}
            placeholder="Add ingredients"
            onKeyPress={(e) => {
              handleAddIngredients(e);
            }}
          />
          <Button onClick={() => dispatch(setShowFilter(true))}>Filter</Button>
        </div>
        <Result.ResultIngredientsContainer>
          <span>Your ingredients:</span>
          <ul>
            {ingredients?.map((item, index) => (
              <IngredientBox key={`r${index}`} index={index} item={item} />
            ))}
          </ul>
        </Result.ResultIngredientsContainer>

        <Button variant="primary">Search</Button>
      </Result.SearchBarSection>

      <Result.ResultSection>
        {recipeByIngredient && recipeInformation && !showLoading ? (
          renderResult(recipeByIngredient, recipeInformation)
        ) : (
          <LoadingComponent />
        )}
      </Result.ResultSection>
    </Result.SearchResultContainer>
  );
};

export default ResultPage;
