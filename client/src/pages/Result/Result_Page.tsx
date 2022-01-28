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
import Search_Button from "../../components/searchButton/Search_Button";
import InfiniteScroll from "react-infinite-scroll-component";

const ResultPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { ingredients, recipeByIngredient, recipeInformation, excludes } =
    useSelector((state: RootState) => state.search);
  const query = useQuery().get("ingreds")?.toLowerCase();

  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [_showLoading, _setShowLoading] = useState<boolean>(false);
  const [_ingredients, _setIngredients] = useState<string[]>([]);
  const [_page, _setPage] = useState<number>(0);
  const [_results, _setResults] = useState<IRecipeByIngredient[][]>([]);

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

  useEffect(() => {
    if (recipeByIngredient) {
      let container: IRecipeByIngredient[][] = [];
      let result: IRecipeByIngredient[] = [];
      for (let i = 0; i < recipeByIngredient.length; i++) {
        result.push(recipeByIngredient[i]);
        if (result.length !== 0 && result.length === 15) {
          container.push(result);
          result = [];
        } else if (result.length !== 0 && recipeByIngredient.length - 1 === i) {
          container.push(result);
        }
      }
      _setResults(container);
    }
  }, [recipeByIngredient]);

  const getResult = async (ingreds: string): Promise<void> => {
    const _ingreds = ingreds.split(",");
    _setShowLoading(true);
    const action = await dispatch(
      getRecipeByIngredients({ ingredients: _ingreds, excludes })
    );
    if (isFulfilled(action)) {
      _setShowLoading(false);
      const id = action.payload.map((item) => item.id.toString());
      dispatch(getRecipeInformation(id ?? []));
    }
  };

  const handleAddIngredientsAdd = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (
      e.key === "Enter" &&
      !_ingredients.includes(searchInputRef.current.value)
    ) {
      if (searchInputRef.current?.value) {
        dispatch(addIngredients(searchInputRef.current.value));
        _setIngredients([..._ingredients, searchInputRef.current.value]);
      }
      searchInputRef.current.value = "";
    }
  };

  const removeIngredient = (item: string): void => {
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
    _recipeByIngredient: IRecipeByIngredient[][],
    _recipeInformation: IRecipeInformation[]
  ): (JSX.Element | undefined)[][] => {
    console.log(_recipeByIngredient);
    const cards = _recipeInformation.map(
      (info: IRecipeInformation, i: number) => {
        return _recipeByIngredient[_page].map(
          (recipe: IRecipeByIngredient, ii: number) => {
            if (recipe.id === info.id) {
              return (
                <ResultCard
                  key={`resultC${i}`}
                  recipeByIngredient={recipe}
                  recipeInformation={info}
                />
              );
            }
          }
        );
      }
    );
    return cards;
  };

  const loadNextPage = (): void => {
    _setPage(_page + 1);
  };

  const isSearchDisabled =
    ingredients?.length === 0 && searchInputRef.current?.value === ""
      ? true
      : false;

  return (
    <Styled.SearchResultContainer>
      <FilterModal />
      <Styled.SearchBarSection>
        <div>
          <input
            ref={searchInputRef}
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

        <Search_Button
          isSearchDisabled={isSearchDisabled}
          setShowLoading={_setShowLoading}
        />
      </Styled.SearchBarSection>

      <Styled.ResultSection>
        {recipeByIngredient && recipeInformation && !_showLoading ? (
          <InfiniteScroll
            dataLength={recipeByIngredient.length}
            next={loadNextPage}
            hasMore={_page + 1 !== Math.ceil(recipeByIngredient.length / 15)}
            loader={<h2>loading...</h2>}
          >
            {_results.length !== 0 ? (
              renderResult(_results, recipeInformation)
            ) : (
              <></>
            )}
          </InfiniteScroll>
        ) : (
          <LoadingComponent />
        )}
      </Styled.ResultSection>
    </Styled.SearchResultContainer>
  );
};

export default ResultPage;
