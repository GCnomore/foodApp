import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { OpenFilterModal } from "./Modals";

import styled from "styled-components/macro";
import { Dropdown } from "react-bootstrap";
import main_bg1 from "../assets/img/main_bg/main_bg1.webp";
import main_bg2 from "../assets/img/main_bg/main_bg2.webp";
import main_bg3 from "../assets/img/main_bg/main_bg3.webp";
import main_bg4 from "../assets/img/main_bg/main_bg4.webp";
import main_bg5 from "../assets/img/main_bg/main_bg5.webp";
import { Set } from "typescript";

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
      </ContentsContainer>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.main``;

const ContentsContainer = styled.main``;

const bg1 = `background-image: url(${main_bg1}); background-size: cover; background-position: top;`;
const bg2 = `background-image: url(${main_bg2}); background-size: cover; background-position: bottom;`;
const bg3 = `background-image: url(${main_bg3}); background-size: cover; background-position: center;`;
const bg4 = `background-image: url(${main_bg4}); background-size: cover; background-position: bottom;`;
const bg5 = `background-image: url(${main_bg5}); background-size: cover; background-position: bottom;`;

const TopSection = styled.section`
  ${bg2}
  height: 90vh;
  min-height: 30rem;
  background-color: darkslategrey;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 5rem;
  font-size: 4rem;
  color: white;

  > h1 {
    margin: 0;
  }
`;

const FoodTriviaContainer = styled.div`
  color: white;
  font-size: 1.2rem;
  font-family: cursive;
  margin: 2rem 20rem -10rem 20rem;
  text-shadow: 2px 2px 4px black;
  text-align: center;

  > span {
    font-size: 1.5rem;
  }
`;

const BottomSection = styled.section``;

const SearchContainer = styled.div`
  width: 40vw;
  min-width: 45rem;
  height: fit-content;
  max-height: 20rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;

  margin-top: 10rem;
  padding: 0.5rem 1rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  > input {
    height: 2rem;
  }

  > * {
    margin: 0.25rem 0;
  }

  > a > button,
  > button {
    width: 100%;
    height: 2rem;
  }

  > div:nth-child(1) {
    > button {
      height: 2rem;
    }
  }

  > div:nth-child(2) {
    display: flex;
    width: 100%;
    height: 2.5rem;
    > input {
      flex: 3;
      padding: 0.5rem;
      outline: none;
    }
    > button {
      flex: 1;
    }
  }
`;

const DropDownToggle = styled(Dropdown.Toggle)`
  width: 100%;
`;

const DropDownMenu = styled(Dropdown.Menu)`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(1.2px);
  width: 40vw;
  min-width: 45rem;
  margin-bottom: 1rem;

  > a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    margin: 0.5rem 0.25rem;
  }
`;

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-shadow: 2px 2px 8px black;

  > ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;

    > li {
      padding: 1rem 0.25rem 0 0.25rem;
      margin: 0 0.5rem;
    }
  }
`;

const RankingContainer = styled.div`
  display: flex;
  justify-content: center;

  > div {
    margin: 1rem 10rem;
  }
`;

const DeleteIngredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    position: fixed;
    margin-bottom: 0.8rem;

    &:hover {
      cursor: pointer;
    }
  }
`;
