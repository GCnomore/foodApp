import ResultCard from "../../components/Result_Card/ResultCard";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalTitle } from "react-bootstrap";
import {
  FilterButton,
  ResultSection,
  SearchBarSection,
  SearchResultContainer,
  ResultIngredientsContainer,
} from "./Result_Page_Styled";
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
  const { ingredients, showLoading, recipeByIngredient, recipeInformation } =
    useSelector((state: RootState) => state.search);

  const userInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    getResult();
  }, [dispatch]);

  const getResult = async () => {
    let action;
    if (!recipeByIngredient) {
      action = await dispatch(getRecipeByIngredients(ingredients));
    }
    if (isFulfilled(action)) {
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
    if (recipeByIngredient && recipeInformation) {
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
    }
  };

  return (
    <SearchResultContainer>
      <FilterModal />

      <SearchBarSection>
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
        <ResultIngredientsContainer>
          <span>Your ingredients:</span>
          <ul>
            {ingredients?.map((item, index) => (
              <IngredientBox key={`r${index}`} index={index} item={item} />
            ))}
          </ul>
        </ResultIngredientsContainer>

        <Button variant="primary">Search</Button>
      </SearchBarSection>

      <ResultSection>
        {recipeByIngredient && recipeInformation ? (
          renderResult(recipeByIngredient, recipeInformation)
        ) : (
          <LoadingComponent />
        )}
      </ResultSection>
    </SearchResultContainer>
  );
};

export default ResultPage;

const TTT: ISearchResult[] = [
  {
    id: 1,
    image: "https://source.unsplash.com/user/c_v_r/100x100",
    imageType: "jpg",
    likes: 10,
    missedIngredientCount: 1,
    missedIngredients: [{ name: "a" }],
    title: "JJin Ramen",
    usedIngredientCount: 3,
    usedIngredients: ["ramen noodle", "water", "ramen powder"],
  },
  {
    id: 2,
    image: "https://source.unsplash.com/user/c_v_r/100x100",
    imageType: "jpg",
    likes: 2,
    missedIngredientCount: 3,
    missedIngredients: [{ name: "soda" }, { name: "garlic" }, { name: "egg" }],
    title: "Shin Ramen",
    usedIngredientCount: 4,
    usedIngredients: ["ramen noodle", "water", "ramen powder", "gun duh gi"],
  },
  {
    id: 10102,
    image: "https://source.unsplash.com/user/c_v_r/100x100",
    imageType: "jpg",
    likes: 102,
    missedIngredientCount: 0,
    missedIngredients: [],
    title: "Jjam pong",
    usedIngredientCount: 6,
    usedIngredients: [
      "noodle",
      "water",
      "jjam pong",
      "noodle",
      "water",
      "jjam pong",
    ],
  },
  {
    id: 3453,
    image: "https://source.unsplash.com/user/c_v_r/100x100",
    imageType: "jpg",
    likes: 0,
    missedIngredientCount: 3,
    missedIngredients: [
      { name: "noodle" },
      { name: "water" },
      { name: "jjam pong" },
    ],
    title: "Hong Ramen",
    usedIngredientCount: 0,
    usedIngredients: [],
  },
];

const INGRE = ["potato", "tomato", "oninon", "salt"];
