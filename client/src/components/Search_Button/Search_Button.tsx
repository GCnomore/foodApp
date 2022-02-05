import { isFulfilled } from "@reduxjs/toolkit";
import React, { SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getRecipeByIngredients,
  getRecipeInformation,
} from "../../redux/slice/searchSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { ROUTES } from "../../routers/Routers";

interface ISearchButton {
  setShowLoading: React.Dispatch<SetStateAction<boolean>>;
  isSearchDisabled: boolean;
}

const Search_Button: React.FC<ISearchButton> = (props) => {
  const { setShowLoading, isSearchDisabled } = props;

  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const { ingredients, excludes } = useSelector(
    (state: RootState) => state.search
  );

  // TODO: limit ingredients to 20
  const handleSearch = async () => {
    setShowLoading(true);
    const action = await dispatch(
      getRecipeByIngredients({ ingredients, number: "2" })
    );
    if (isFulfilled(action)) {
      console.log("actionnnnnnn", action.payload);
      setShowLoading(false);
      history.push(
        `${ROUTES.RESULT_PAGE}?ingreds=${ingredients.toString()}`,
        ingredients
      );
    }
  };

  return (
    <button disabled={isSearchDisabled} onClick={handleSearch}>
      Search
    </button>
  );
};

export default Search_Button;
