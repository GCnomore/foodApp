import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import { AppActions } from "../../redux/actions/actions";
import { connect } from "react-redux";
import { OpenFilterModal } from "../../components/Modals";
import ROUTES from "../../routers/Routers";
import { AppState } from "../../redux/reducer/Home_Reducer/reducer";

interface HomeProps {
  SET_SEARCH_BY: (searchBy: string) => void;
  SET_SEARCH: (search: string) => void;
  SET_INGREDIENTS: (ingredients: string[]) => void;
  SET_FOOD_TRIVIA: (foodTrivia: string) => void;
  SET_SHOW_FILTER: (showFilter: boolean) => void;
  SET_CHECKED: (check: { name: string; checked: boolean }[]) => void;
  SET_EXCLUDE: (exclude: string[]) => void;
  state: AppState;
}

const HomePage: React.FC<HomeProps> = (props: HomeProps) => {
  const {
    SET_SEARCH_BY,
    SET_SEARCH,
    SET_INGREDIENTS,
    SET_FOOD_TRIVIA,
    SET_SHOW_FILTER,
    SET_CHECKED,
    SET_EXCLUDE,
  } = props;
  const state: AppState = props.state;
  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [filterUserInput, setFilterUserInput] = useState("");
  const [ingredientsDelete, setIngredientsDelete] = useState({
    show: false,
    index: 0,
  });

  const history = useHistory();

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
      SET_INGREDIENTS(update);
    }
  };

  const handleSearch = () => {
    history.push("/result");
    // SET_INGREDIENTS([]);
    // SET_SEARCH("");
  };

  const isSearchDisabled =
    state.ingredients?.length === 0 && state.search === "" ? true : false;

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
                    SET_SEARCH_BY(e?.substring(2) || "");
                  }}
                >
                  by Ingredient
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/name"
                  onSelect={(e) => {
                    SET_SEARCH_BY(e?.substring(2) || "");
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
                <button onClick={() => SET_SHOW_FILTER(true)}>Filter</button>
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
            {/* <Link
              to={{
                pathname: `${ROUTES.RESULT_PAGE}${state.ingredients?.join(
                  "&"
                )}`,
                // search: `?${getFilters()}`,
              }}
            > */}
            <button disabled={isSearchDisabled} onClick={handleSearch}>
              Search
            </button>
            {/* </Link> */}
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
  SET_FOOD_TRIVIA: (foodTrivia: string) => {
    dispatch(AppActions.setFoodTrivia(foodTrivia));
  },
  SET_SHOW_FILTER: (showFilter: boolean) => {
    dispatch(AppActions.setShowFilter(showFilter));
  },
  SET_CHECKED: (check: { name: string; checked: boolean }[]) => {
    dispatch(AppActions.setChecked(check));
  },
  SET_EXCLUDE: (exclude: string[]) => {
    dispatch(AppActions.setExclude(exclude));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
