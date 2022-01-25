import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeIngredients } from "../../redux/slice/searchSlice";
import { AppDispatch } from "../../redux/store";
import * as Styled from "./Ingredient_Box_Styled";

interface IngredientBoxProps {
  index: number;
  item: string;
  removeIngredient?: (ing: string) => void;
}

const IngredientBox: React.FC<IngredientBoxProps> = ({
  index,
  item,
  removeIngredient,
}) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Styled.IngredientBoxContainer
      onClick={() => {
        dispatch(removeIngredients(item));
        removeIngredient && removeIngredient(item);
      }}
    >
      <span>{item.toLowerCase()}</span>
    </Styled.IngredientBoxContainer>
  );
};

export default IngredientBox;
