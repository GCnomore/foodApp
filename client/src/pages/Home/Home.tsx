import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Dropdown } from "react-bootstrap";
import {
  BottomSection,
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
import { OpenFilterModal } from "../../components/Modals";

const Home: React.FC = () => {
  const [searchBy, setSearchBy] = useState("ingredients");
  const [search, setSeacrh] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [foodTrivia, setFoodTrivia] = useState<string | null>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [ingredientsDelete, setIngredientsDelete] = useState({
    show: false,
    index: 0,
  });

  const [exclude, setExclude] = useState<string[]>([]);
  const [filterUserInput, setFilterUserInput] = useState("");
  const [checked, setChecked] = useState<{ name: string; checked: boolean }[]>([
    {
      name: "Vegan",
      checked: false,
    },
    {
      name: "Vegitarian",
      checked: false,
    },
    {
      name: "Gluten Free",
      checked: false,
    },
    {
      name: "Dairy Free",
      checked: false,
    },
    {
      name: "No Missing Ingredients",
      checked: false,
    },
    {
      name: "Cuisine",
      checked: false,
    },
    {
      name: "Dish Type",
      checked: false,
    },
  ]);

  useEffect(() => {
    sessionStorage.getItem("trivia") === null
      ? getFoodTrivia()
      : setFoodTrivia(sessionStorage.getItem("trivia"));
  }, []);

  // TODO: limit ingredients to 20

  const getFilters = (): string => {
    const filterQuery: string[] = [];
    checked.filter((item) => {
      if (item.checked && filterQuery.length === 0) {
        filterQuery.push(item.name.replace(/\s+/g, ""), "=", `${item.checked}`);
      } else if (item.checked && filterQuery.length > 2) {
        filterQuery.push(
          "&",
          item.name.replace(/\s+/g, ""),
          "=",
          `${item.checked}`
        );
      }
    });
    return filterQuery.join("").trim().toLowerCase();
  };

  const deleteIngredient = (ingredient: string): void => {
    const update: string[] = ingredients.filter(
      (item: string) => item !== ingredient
    );
    setIngredients(update);
  };

  const getFoodTrivia = async () => {
    const trivia: string = await axios({
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random",
      headers: {
        "x-rapidapi-key": "80c5024537mshda9eb5674d6ffbcp1cd8a6jsn7de3a31beb98",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    }).then((res) => res.data.text);
    sessionStorage.setItem("trivia", trivia);
    setFoodTrivia(trivia);
    console.log("getFoodTrivia");
  };

  return (
    <HomeContainer>
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
                <span>Search by {searchBy}</span>
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
              value={search}
              placeholder={
                searchBy === "ingredients" ? "Add your ingredients" : "Search"
              }
              onChange={(e) => {
                setSeacrh(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!ingredients.includes(search)) {
                    setIngredients((prev) => [...prev, search]);
                  }
                  setSeacrh("");
                }
              }}
            />
            {searchBy === "name" ? (
              <></>
            ) : (
              <button onClick={(e) => setShowFilter(true)}>Filter</button>
            )}
            <OpenFilterModal
              show={showFilter}
              onHide={() => setShowFilter(false)}
              exclude={exclude}
              setExclude={setExclude}
              filterUserInput={filterUserInput}
              setFilterUserInput={setFilterUserInput}
              checked={checked}
              setChecked={setChecked}
            />
          </div>
          {searchBy === "name" ? (
            <></>
          ) : (
            <IngredientsContainer>
              <span>Your ingredients:</span>
              <ul>
                {ingredients.map((item, index) => (
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
                        onClick={(e) => deleteIngredient(item)}
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
              pathname: `/search/${ingredients.join("&")}`,
              search: `?${getFilters()}`,
            }}
          >
            <button
              disabled={
                ingredients.length === 0 && search === "" ? true : false
              }
              onClick={() => {
                setIngredients([]);
                setSeacrh("");
              }}
            >
              Search
            </button>
          </Link>
          <button>Get random</button>
        </SearchContainer>
        <FoodTriviaContainer>
          <h2>Did you know?</h2>
          <span>{foodTrivia === undefined ? "..." : `"${foodTrivia}"`}</span>
        </FoodTriviaContainer>
      </TopSection>
      <BottomSection>
        <RankingContainer>
          <div>
            <h3>Most searched ingredients this week</h3>
          </div>
          <div>
            <h3>Most viewed recipes this week</h3>
          </div>
        </RankingContainer>
      </BottomSection>
    </HomeContainer>
  );
};

export default Home;
