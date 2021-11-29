import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeIngredients } from "../../redux/slice/searchSlice";
import { AppDispatch } from "../../redux/store";
import { DeleteIngredButtonContainer } from "./Ingredient_Box_Styled";

interface IngredientBoxProps {
  index: number;
  item: string;
}

const IngredientBox: React.FC<IngredientBoxProps> = ({ index, item }) => {
  const dispatch: AppDispatch = useDispatch();
  const [ingredientsDelete, setIngredientsDelete] = useState({
    show: false,
    index: 0,
  });

  return (
    <li
      onMouseEnter={() => {
        setIngredientsDelete({ show: true, index });
      }}
      onMouseLeave={() => {
        setIngredientsDelete({ show: false, index: 0 });
      }}
    >
      {ingredientsDelete.show === true && ingredientsDelete.index === index ? (
        <DeleteIngredButtonContainer
          onClick={() => dispatch(removeIngredients(item))}
        >
          <span>x</span>
        </DeleteIngredButtonContainer>
      ) : (
        <></>
      )}
      <span>{item.toLowerCase()}</span>
    </li>
  );
};

export default IngredientBox;
