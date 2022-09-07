import React, { useEffect, useRef, useState } from "react";
import { isFulfilled } from "@reduxjs/toolkit";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
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
import { useQuery } from "../../hooks/useQuery";
import SEARCH_BUTTON from "../../components/Search_Button/Search_Button";
import { IRecipeByIngredients } from "../../data/interfaces/Recipe_By_Ingredients";

const ResultPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { ingredients, recipeByIngredient, checkFilters } = useSelector(
    (state: RootState) => state.search
  );
  const query: string | undefined = useQuery().get("ingreds")?.toLowerCase();

  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [_showLoading, _setShowLoading] = useState<boolean>(false);
  const [_ingredients, _setIngredients] = useState<string[]>([]);
  const [_page, _setPage] = useState<number>(1);
  const [_filteredResult, _setFilteredResult] = useState<{
    recipe: IRecipeByIngredients[];
  }>();

  const scrollIndicator = useRef<HTMLDivElement>(null);

  //* Refresh & direct access to result page
  useEffect(() => {
    if (ingredients.length === 0 && query) {
      query.split(",").forEach((item: string) => {
        _setIngredients((prev) => [...prev, _.upperFirst(item)]);
      });
      getResult(query);
    } else {
      _setIngredients(ingredients);
    }
  }, [dispatch]);

  //* Infinite scroll listener
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [_page]);

  //* get filtered list
  useEffect(() => {
    const filters: string[] = [];
    checkFilters.forEach((item) => {
      if (item.checked) {
        filters.push(item.name);
      }
    });

    if (recipeByIngredient) {
      const filteredRecipe: IRecipeByIngredients[] = recipeByIngredient?.filter(
        (recipe: IRecipeByIngredients) => {
          if (filters.length !== 0) {
            return filters.every((filter: string) =>
              recipe.diets.includes(filter.toLocaleLowerCase())
            );
          } else {
            return recipe;
          }
        }
      );

      _setFilteredResult({
        recipe: filteredRecipe,
      });
    }
  }, [checkFilters, recipeByIngredient]);

  // Infinite scroll trigger
  const scrollHandler = (): void => {
    if (
      recipeByIngredient &&
      scrollIndicator.current &&
      scrollIndicator.current?.getBoundingClientRect().y < 1000
    ) {
      if (_page < Math.ceil(recipeByIngredient.length / 15)) {
        _setPage(_page + 1);
        window.removeEventListener("scroll", scrollHandler);
      }
    }
  };

  const getResult = async (ingreds: string): Promise<void> => {
    const _ingreds = ingreds.split(",");
    _setShowLoading(true);
    const action = await dispatch(
      getRecipeByIngredients({ ingredients: _ingreds, number: "50" })
    );
    if (isFulfilled(action)) {
      _setShowLoading(false);
      const id = action.payload.map((item) => item.id.toString());
      dispatch(getRecipeInformation(id ?? []));
    }
  };

  const handleAddIngredients = (
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
    recipe: IRecipeByIngredients[]
  ): (JSX.Element | undefined)[] => {
    const cards = recipe.map((item: IRecipeByIngredients, i: number) => {
      if (i < _page * 15) {
        return <ResultCard key={`resultC${i}`} recipeByIngredient={item} />;
      } else {
        return <>No Results found</>;
      }
    });
    return cards;
  };

  const isSearchDisabled: boolean =
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
              handleAddIngredients(e);
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

        <SEARCH_BUTTON
          isSearchDisabled={isSearchDisabled}
          setShowLoading={_setShowLoading}
        />
      </Styled.SearchBarSection>

      <Styled.ResultSection>
        {_filteredResult && !_showLoading ? (
          renderResult(_filteredResult.recipe)
        ) : (
          <LoadingComponent />
        )}
        <Styled.ScrollIndicator ref={scrollIndicator} />
      </Styled.ResultSection>
    </Styled.SearchResultContainer>
  );
};

export default ResultPage;
