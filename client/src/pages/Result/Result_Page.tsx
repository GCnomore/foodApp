import React, { useEffect, useRef, useState } from "react";
import { isFulfilled } from "@reduxjs/toolkit";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import _, { filter } from "lodash";

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
import ICheckFilters from "../../data/interfaces/Check_Filters";

const ResultPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    ingredients,
    recipeByIngredient,
    recipeInformation,
    excludes,
    checkFilters,
  } = useSelector((state: RootState) => state.search);
  const query: string | undefined = useQuery().get("ingreds")?.toLowerCase();

  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [_showLoading, _setShowLoading] = useState<boolean>(false);
  const [_ingredients, _setIngredients] = useState<string[]>([]);
  const [_page, _setPage] = useState<number>(1);
  const [_filteredResult, _setFilteredResult] =
    useState<IRecipeByIngredient[]>();

  const scrollIndicator = useRef<HTMLDivElement>(null);

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
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [_page]);

  useEffect(() => {
    let filteredList: IRecipeInformation[] = [];
    const filters: ICheckFilters[] = checkFilters.filter(
      (item: ICheckFilters) => item.checked
    );
    let res: boolean[] = [];

    filters.forEach((i: ICheckFilters, index: number) => {
      console.log("index", index, filters.length);
      recipeInformation?.forEach((ii: IRecipeInformation) => {
        if (ii.diets.includes(i.name.toLowerCase())) {
          res.push(true);
        } else {
          res.push(false);
        }
        if (index === filters.length - 1) {
          if (!res.includes(false)) {
            filteredList.push(ii);
            res = [];
          } else {
            res = [];
          }
        }
      });
    });

    const result = Array.from(new Set(filteredList));
    console.log("filtered", result);
  }, [checkFilters]);

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
    _recipeByIngredient: IRecipeByIngredient[],
    _recipeInformation: IRecipeInformation[]
  ): (JSX.Element | undefined)[] => {
    const cards = _recipeInformation.map(
      (info: IRecipeInformation, i: number) => {
        if (i < _page * 15) {
          return (
            <ResultCard
              key={`resultC${i}`}
              recipeByIngredient={_recipeByIngredient[i]}
              recipeInformation={info}
            />
          );
        }
      }
    );
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
          renderResult(recipeByIngredient, recipeInformation)
        ) : (
          <LoadingComponent />
        )}
        <Styled.ScrollIndicator ref={scrollIndicator} />
      </Styled.ResultSection>
    </Styled.SearchResultContainer>
  );
};

export default ResultPage;
