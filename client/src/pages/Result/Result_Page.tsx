import React, { useEffect, useRef, useState } from "react";
import { isFulfilled } from "@reduxjs/toolkit";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import _ from "lodash";

import {
  setShowFilter,
  addIngredients,
  getRecipeByIngredients,
  getRecipeInformation,
} from "../../redux/slice/searchSlice";
import * as Styled from "./Result_Page_Styled";
import LoadingComponent from "../../components/Loading/Loading_Component";
import ResultCard from "../../components/Result_Card/ResultCard";
import FilterModal from "../../components/Filter_Modal/Filter_Modal";
import IngredientBox from "../../components/Ingredient_Box/Ingredient_Box";
import { AppDispatch, RootState } from "../../redux/store";
import { IRecipeByIngredient } from "../../data/interfaces/Search";
import IRecipeInformation from "../../data/interfaces/Recipe_Information";
import { useQuery } from "../../util/Utils";

const ResultPage: React.FC = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const { ingredients, recipeByIngredient, recipeInformation, excludes } =
    useSelector((state: RootState) => state.search);

  const userInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const query = useQuery().get("ingreds")?.toLowerCase();
  const [_ingredients, _setIngredients] = useState<string[]>([]);

  useEffect(() => {
    if (ingredients.length == 0 && query) {
      query.split(",").map((item: string) => {
        _setIngredients((prev) => [...prev, _.upperFirst(item)]);
      });
      getResult(query);
    } else {
      _setIngredients(ingredients);
    }
  }, [dispatch]);

  const getResult = async (ingreds: string) => {
    console.log("search from result page!!");
    const _ingreds = ingreds.split(",");
    setShowLoading(true);
    const action = await dispatch(
      getRecipeByIngredients({ ingredients: _ingreds, excludes })
    );
    if (isFulfilled(action)) {
      setShowLoading(false);
      const id = action.payload.map((item) => item.id.toString());
      dispatch(getRecipeInformation(id ?? []));
    }
  };

  const handleAddIngredientsAdd = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Enter" &&
      !_ingredients.includes(userInputRef.current.value)
    ) {
      userInputRef.current?.value &&
        dispatch(addIngredients(userInputRef.current.value));
      userInputRef.current.value = "";
    }
  };

  const removeIngredient = (item: string) => {
    if (_ingredients.includes(item)) {
      const newIngredients = _ingredients.filter(
        (ing: string) => ing.toLowerCase() !== item.toLowerCase()
      );
      _setIngredients(newIngredients);
    } else {
      return;
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

  return (
    <Styled.SearchResultContainer>
      <FilterModal />
      <Styled.SearchBarSection>
        <div>
          <input
            ref={userInputRef}
            placeholder="Add ingredients"
            onKeyPress={(e) => {
              handleAddIngredientsAdd(e);
            }}
          />
          <Button onClick={() => dispatch(setShowFilter(true))}>Filter</Button>
        </div>
        <Styled.ResultIngredientsContainer>
          <span>Your ingredients:</span>
          <ul>
            {_ingredients?.map((item, index) => (
              <IngredientBox
                key={`r${index}`}
                index={index}
                item={item}
                removeIngredient={removeIngredient}
              />
            ))}
          </ul>
        </Styled.ResultIngredientsContainer>

        <Button variant="primary">Search</Button>
      </Styled.SearchBarSection>

      <Styled.ResultSection>
        {recipeByIngredient && recipeInformation && !showLoading ? (
          renderResult(recipeByIngredient, recipeInformation)
        ) : (
          <LoadingComponent />
        )}
      </Styled.ResultSection>
    </Styled.SearchResultContainer>
  );
};

export default ResultPage;
