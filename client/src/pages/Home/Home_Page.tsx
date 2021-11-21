import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import FilterModal from "../../components/Filter_Modal/Filter_Modal";
import ROUTES from "../../routers/Routers";
import {
  addIngredients,
  getFoodTrivia,
  HomeState,
  removeIngredients,
  setFoodTrivia,
  setSearchBy,
  setShowFilter,
} from "../../redux/slice/homeSlice";
import _ from "lodash";
import { AppDispatch, RootState } from "../../redux/store";

const HomePage: React.FC = () => {
  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [filterUserInput, setFilterUserInput] = useState("");
  const [ingredientsDelete, setIngredientsDelete] = useState({
    show: false,
    index: 0,
  });
  const dispatch: AppDispatch = useDispatch();
  const {
    search,
    searchBy,
    showFilter,
    ingredients,
    checkFilters,
    excludes,
    foodTrivia,
  } = useSelector((state: RootState) => state.home);

  const history = useHistory();

  useEffect(() => {
    sessionStorage.getItem("trivia")
      ? dispatch(setFoodTrivia(sessionStorage.getItem("trivia")))
      : dispatch(getFoodTrivia());
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

  const handleSearch = () => {
    history.push(ROUTES.RESULT_PAGE, ingredients);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(addIngredients(searchInputRef.current.value));
      searchInputRef.current.value = "";
    }
  };

  const isSearchDisabled =
    ingredients?.length === 0 && searchInputRef.current?.value === ""
      ? true
      : false;

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
                {searchBy === "" ? (
                  <span>Search By</span>
                ) : (
                  <span>Search by {_.capitalize(searchBy)}</span>
                )}
              </DropDownToggle>

              <DropDownMenu>
                <Dropdown.Item
                  href="#/ingredients"
                  onSelect={(e) => {
                    dispatch(setSearchBy(e?.substring(2) || ""));
                  }}
                >
                  by Ingredient
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/name"
                  onSelect={(e) => {
                    dispatch(setSearchBy(e?.substring(2) || ""));
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
                  searchBy === "ingredients" ? "Add your ingredients" : "Search"
                }
                onKeyDown={(e) => {
                  handleEnter(e);
                }}
              />
              {searchBy === "name" ? (
                <></>
              ) : (
                <button onClick={() => dispatch(setShowFilter(true))}>
                  Filter
                </button>
              )}
              <FilterModal />
            </div>
            {searchBy === "name" ? (
              <></>
            ) : (
              <IngredientsContainer>
                <span>Your ingredients:</span>
                <ul>
                  {ingredients?.map((item, index) => (
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
                          onClick={() => dispatch(removeIngredients(item))}
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

            <button disabled={isSearchDisabled} onClick={handleSearch}>
              Search
            </button>
            <button>Get random</button>
          </SearchContainer>
          <FoodTriviaContainer>
            <h2>Did you know?</h2>
            <span>{foodTrivia ? `"${foodTrivia}"` : "..."}</span>
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

export default HomePage;
