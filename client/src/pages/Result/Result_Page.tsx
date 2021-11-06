import ResultCard from "../../components/ResultCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { UrlObject } from "url";
import { Button, Modal, ModalBody, ModalTitle } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import {
  FilterButton,
  ToggleFilterContainer,
  IngredientsContainer,
  ResultSection,
  SearchBarSection,
  SearchResultContainer,
} from "./Result_Styled";
import { SearchResultInterface } from "../../data/interfaces/Search_Result";
import LoadingComponent from "../../components/Loading_Component";
import { DietFilters, DIET_FILTERS } from "../../constants";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducer/Home_Reducer/reducer";
import { AppActions } from "../../redux/actions/actions";

interface ResultProps {
  SET_SEARCH_BY: (searchBy: string) => void;
  SET_SEARCH: (search: string) => void;
  SET_INGREDIENTS: (ingredients: string[]) => void;
  SET_CHECKED: (check: { name: string; checked: boolean }[]) => void;
  SET_EXCLUDE: (exclude: string[]) => void;
  state: AppState;
}

const ResultPage: React.FC<ResultProps> = (props: ResultProps) => {
  const {
    SET_SEARCH_BY,
    SET_SEARCH,
    SET_INGREDIENTS,
    SET_CHECKED,
    SET_EXCLUDE,
  } = props;
  const state: AppState = props.state;
  const [showLoading, setShowLoading] = useState(false);
  const [userInput, setUserInput] = useState<string>("");
  const [toggleNoMissingIngreds, setToggleNoMissingIngreds] = useState(false);
  const [filter, setFilter] = useState({
    cuisine: [],
    dishType: [],
  });
  const [showFilter, setShowFilter] = useState(false);
  const [toggleDietFilter, setToggleDietFilter] = useState(DIET_FILTERS);

  useEffect(() => {}, []);

  const renderIngredients = () => {
    return state.ingredients?.map((item) => (
      <li
        onClick={() => {
          const newIngredients = state.ingredients?.filter(
            (ingred) => ingred !== item
          );
          newIngredients && SET_INGREDIENTS(newIngredients);
        }}
      >
        {`${item.charAt(0).toUpperCase()}` + `${item.slice(1)}`}
      </li>
    ));
  };

  const renderResult = () => {
    // return searchResult?.map((item, index) => (
    //   <ResultCard key={index} searchResult={item} />
    // ));
    return TTT.map((item, index) => (
      <ResultCard key={index} searchResult={item} />
    ));
  };

  const handleToggleFilter = (item: DietFilters) => {
    setToggleDietFilter(
      toggleDietFilter.map((i) =>
        i.name === item.name ? { ...i, selected: !i.selected } : i
      )
    );
    console.log(toggleDietFilter);
  };

  const addIngredients = (userInput: string) => {
    state.ingredients && SET_INGREDIENTS([...state.ingredients, userInput]);
    setUserInput("");
  };

  return (
    <SearchResultContainer>
      <Modal show={showFilter} onHide={() => setShowFilter(false)}>
        <ModalTitle>Filters</ModalTitle>
        <ModalBody>filtersssssssssssssssssssss</ModalBody>
      </Modal>

      <SearchBarSection>
        <div>
          <input
            placeholder="Add ingredients"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addIngredients(userInput);
              }
            }}
          />
          <Button onClick={() => addIngredients(userInput)}>Add</Button>
          <Button onClick={() => setShowFilter(true)}>Filter</Button>
        </div>
        <IngredientsContainer>
          <ul>
            {renderIngredients()}
            <li>potato</li>
            <li>potato</li>
            <li>potato</li>
            <li>potato</li>
            <li>potato</li>
            <li>potato</li>
          </ul>
        </IngredientsContainer>

        <ToggleFilterContainer>
          {toggleDietFilter.map((item) => {
            return (
              <FilterButton
                key={`${item.name}FilterButton`}
                $selected={item.selected}
                onClick={() => handleToggleFilter(item)}
              >
                {item.name}
              </FilterButton>
            );
          })}
        </ToggleFilterContainer>

        <Button variant="primary">Search</Button>
      </SearchBarSection>

      <ResultSection>
        {showLoading ? <LoadingComponent /> : renderResult()}
      </ResultSection>
    </SearchResultContainer>
  );
};

const mapStateToProps = (state: AppState) => ({
  state,
});

const mapDispatchToProps = (dispatch: any) => ({
  SET_SEARCH_BY: (searchBy: string) => {
    dispatch(AppActions.setSearchBy(searchBy));
  },
  SET_SEARCH: (search: string) => {
    dispatch(AppActions.setSearch(search));
  },
  SET_INGREDIENTS: (ingredients: string[]) => {
    dispatch(AppActions.setIngredients(ingredients));
  },
  SET_CHECKED: (check: { name: string; checked: boolean }[]) => {
    dispatch(AppActions.setChecked(check));
  },
  SET_EXCLUDE: (exclude: string[]) => {
    dispatch(AppActions.setExclude(exclude));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);

const TTT: SearchResultInterface[] = [
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
