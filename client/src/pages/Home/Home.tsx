import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  BottomSection,
  ContentsContainer,
  DeleteIngredButtonContainer,
  DropDownMenu,
  DropDownToggle,
  FoodTriviaContainer,
  HomeContainer,
  IngredientsContainer,
  RankingContainer,
  SearchContainer,
  TitleContainer,
  TopSection,
} from "./Home_Styled";
import { Dropdown } from "react-bootstrap";
import { HomeState } from "../../redux/reducer/Home_Reducer/reducer_interface";
import {
  setChecked,
  setExclude,
  setFoodTrivia,
  setIngredients,
  setSearch,
  setSearchBy,
  setShowFilter,
} from "../../redux/actions/actions";
import { connect } from "react-redux";
import { OpenFilterModal } from "../../components/Modals";

interface HomeProps {
  SET_SEARCH_BY: (searchBy: string) => void;
  SET_SEARCH: (search: string) => void;
  SET_INGREDIENTS: (ingredients: string[]) => void;
  SET_FOOD_TRIVIA: (foodTrivia: string) => void;
  SET_SHOW_FILTER: (showFilter: boolean) => void;
  SET_CHECKED: (check: { name: string; checked: boolean }[]) => void;
  SET_EXCLUDE: (exclude: string[]) => void;
  state: any;
}

const Home: React.FC<HomeProps> = (props) => {
  const {
    SET_SEARCH_BY,
    SET_SEARCH,
    SET_INGREDIENTS,
    SET_FOOD_TRIVIA,
    SET_SHOW_FILTER,
    SET_CHECKED,
    SET_EXCLUDE,
  } = props;
  const state: HomeState = props.state.homeReducer;

  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [ingredientsDelete, setIngredientsDelete] = useState({
    show: false,
    index: 0,
  });

  const [filterUserInput, setFilterUserInput] = useState("");

  useEffect(() => {
    console.log("state", state);
    const foodTrivia = sessionStorage.getItem("trivia");
  }, []);

  // TODO: limit ingredients to 20

  // const getFilters = (): string => {
  //   const filterQuery: string[] = [];
  //   state.checked.filter((item) => {
  //     if (item.checked && filterQuery.length === 0) {
  //       filterQuery.push(item.name.replace(/\s+/g, ""), "=", `${item.checked}`);
  //     } else if (item.checked && filterQuery.length > 2) {
  //       filterQuery.push(
  //         "&",
  //         item.name.replace(/\s+/g, ""),
  //         "=",
  //         `${item.checked}`
  //       );
  //     }
  //   });
  //   return filterQuery.join("").trim().toLowerCase();
  // };

  const deleteIngredient = (ingredient: string): void => {
    if (state.ingredients) {
      const update = state.ingredients.filter(
        (item: string) => item !== ingredient
      );
      setIngredients(update);
    }
  };

  return (
    <HomeContainer>
      <ContentsContainer>
        <TopSection>
          <TitleContainer>
            <h1>App Title</h1>
          </TitleContainer>
          <SearchContainer>
            <Dropdown drop="up">
              <DropDownToggle variant="secondary" id="dropdown-basic">
                {state.searchBy === "" ? (
                  <span>Search By</span>
                ) : (
                  <span>Search by {state.searchBy}</span>
                )}
              </DropDownToggle>

              <DropDownMenu>
                <Dropdown.Item
                  href="#/ingredients"
                  onSelect={(e) => {
                    setSearchBy(e?.substring(2) || "");
                  }}
                >
                  by Ingredient
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/name"
                  onSelect={(e) => {
                    setSearchBy(e?.substring(2) || "");
                  }}
                >
                  by Name
                </Dropdown.Item>
              </DropDownMenu>
            </Dropdown>

            <div>
              <input
                ref={searchInputRef}
                placeholder={
                  state.searchBy === "ingredients"
                    ? "Add your ingredients"
                    : "Search"
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    console.log(searchInputRef.current.value);
                    searchInputRef.current.value = "";
                    // if (
                    //   state.ingredients &&
                    //   !state.ingredients.includes(state.search)
                    // ) {
                    //   SET_INGREDIENTS((prev) => [...prev, state.search]);
                    // }
                    // SET_SEARCH("");
                  }
                }}
              />
              {state.searchBy === "name" ? (
                <></>
              ) : (
                <button onClick={() => setShowFilter(true)}>Filter</button>
              )}
              {/* <OpenFilterModal
                show={state.showFilter}
                onHide={() => setShowFilter(false)}
                exclude={state.exclude}
                // TODO: no more props
                setExclude={}
                filterUserInput={filterUserInput}
                setFilterUserInput={setFilterUserInput}
                checked={state.checked}
                setChecked={setChecked}
              /> */}
            </div>
            {state.searchBy === "name" ? (
              <></>
            ) : (
              <IngredientsContainer>
                <span>Your ingredients:</span>
                <ul>
                  {state.ingredients?.map((item, index) => (
                    <li
                      key={index}
                      onMouseEnter={() => {
                        setIngredientsDelete({ show: true, index });
                      }}
                      onMouseLeave={() => {
                        setIngredientsDelete({ show: false, index: 0 });
                      }}
                    >
                      {ingredientsDelete.show === true &&
                      ingredientsDelete.index === index ? (
                        <DeleteIngredButtonContainer
                          onClick={() => deleteIngredient(item)}
                        >
                          <span>x</span>
                        </DeleteIngredButtonContainer>
                      ) : (
                        <></>
                      )}
                      <span>{item.toLowerCase()}</span>
                    </li>
                  ))}
                </ul>
              </IngredientsContainer>
            )}
            <Link
              to={{
                pathname: `/search/${state.ingredients?.join("&")}`,
                // search: `?${getFilters()}`,
              }}
            >
              <button
                disabled={
                  state.ingredients?.length === 0 && state.search === ""
                    ? true
                    : false
                }
                onClick={() => {
                  setIngredients([]);
                  SET_SEARCH("");
                }}
              >
                Search
              </button>
            </Link>
            <button>Get random</button>
          </SearchContainer>
          <FoodTriviaContainer>
            <h2>Did you know?</h2>
            <span>
              {state.foodTrivia === undefined ? "..." : `"${state.foodTrivia}"`}
            </span>
          </FoodTriviaContainer>
        </TopSection>
        {/*//! Need DB to implement this  */}
        {/* <BottomSection>
          <RankingContainer>
            <div>
              <h3>Most searched ingredients this week</h3>
            </div>
            <div>
              <h3>Most viewed recipes this week</h3>
            </div>
          </RankingContainer>
        </BottomSection> */}
      </ContentsContainer>
    </HomeContainer>
  );
};

const mapStateToProps = (state: HomeState) => ({
  state,
});

const mapDispatchToProps = (dispatch: any) => ({
  SET_SEARCH_BY: (searchBy: string) => {
    dispatch(setSearchBy(searchBy));
  },
  SET_SEARCH: (search: string) => {
    dispatch(setSearch(search));
  },
  SET_INGREDIENTS: (ingredients: string[]) => {
    dispatch(setIngredients(ingredients));
  },
  SET_FOOD_TRIVIA: (foodTrivia: string) => {
    dispatch(setFoodTrivia(foodTrivia));
  },
  SET_SHOW_FILTER: (showFilter: boolean) => {
    dispatch(setShowFilter(showFilter));
  },
  SET_CHECKED: (check: { name: string; checked: boolean }[]) => {
    dispatch(setChecked(check));
  },
  SET_EXCLUDE: (exclude: string[]) => {
    dispatch(setExclude(exclude));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
