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
import { connect, useSelector } from "react-redux";
import { SearchState, removeIngredients } from "../../redux/slice/searchSlice";
// import { AppState } from "../../redux/reducer/Home_Reducer/reducer";
// import { AppActions } from "../../redux/actions/actions";

const ResultPage: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [userInput, setUserInput] = useState<string>("");
  const [toggleNoMissingIngreds, setToggleNoMissingIngreds] = useState(false);
  const [filter, setFilter] = useState({
    cuisine: [],
    dishType: [],
  });
  const [showFilter, setShowFilter] = useState(false);
  const [toggleDietFilter, setToggleDietFilter] = useState(DIET_FILTERS);
  const { ingredients } = useSelector((state: SearchState) => state);

  useEffect(() => {}, []);

  const renderIngredients = () => {
    return ingredients?.map((item) => (
      <li
        onClick={() => {
          const newIngredients = ingredients?.filter(
            (ingred) => ingred !== item
          );
          newIngredients && removeIngredients(newIngredients[0]);
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
    ingredients && addIngredients(userInput);
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

export default ResultPage;

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
