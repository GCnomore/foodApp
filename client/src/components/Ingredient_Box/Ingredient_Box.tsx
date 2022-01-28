import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [_isMouseOver, _setIsMouseOver] = useState(false);

  return (
    <Styled.IngredientBoxContainer
      onClick={() => {
        dispatch(removeIngredients(item));
        removeIngredient && removeIngredient(item);
      }}
      onMouseEnter={() => _setIsMouseOver(true)}
      onMouseLeave={() => _setIsMouseOver(false)}
    >
      <span>
        {item.toLowerCase()}
        {_isMouseOver ? <FontAwesomeIcon icon={faTimes} /> : <></>}
      </span>
    </Styled.IngredientBoxContainer>
  );
};

export default IngredientBox;
