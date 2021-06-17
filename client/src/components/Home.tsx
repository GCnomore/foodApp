import { useState } from "react";
import SearchResult from "./search/SearchResult";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import styled from "styled-components/macro";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import main_bg1 from "../assets/img/main_bg/main_bg1.webp";
import main_bg2 from "../assets/img/main_bg/main_bg2.webp";
import main_bg3 from "../assets/img/main_bg/main_bg3.webp";
import main_bg4 from "../assets/img/main_bg/main_bg4.webp";
import main_bg5 from "../assets/img/main_bg/main_bg5.webp";

export default function Home() {
  const [searchBy, setSearchBy] = useState("ingredients");
  const [search, setSeacrh] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  console.log(searchBy);

  return (
    <HomeContainer>
      <Router>
        <Switch>
          <Route exact path="/search" render={() => <SearchResult />} />
        </Switch>
      </Router>
      <ContentsContainer>
        <TopSection>
          <SearchContainer>
            <Dropdown drop="up">
              <DropDownToggle variant="secondary" id="dropdown-basic">
                {searchBy === "" ? (
                  <span>
                    Search By <FontAwesomeIcon icon={faChevronUp} />
                  </span>
                ) : (
                  <span>
                    Search by {searchBy} <FontAwesomeIcon icon={faChevronUp} />
                  </span>
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
                  e.key === "Enter" &&
                    setIngredients((prev) => [...prev, search]);
                }}
              />
              {searchBy === "name" ? (
                <></>
              ) : (
                <button
                  onClick={(e) => {
                    setIngredients((prev) => [...prev, search]);
                    setSeacrh("");
                  }}
                >
                  Add ingredient
                </button>
              )}
            </div>
            {searchBy === "name" ? (
              <></>
            ) : (
              <IngredientsContainer>
                <span>Your ingredients:</span>
                <span>{`${ingredients.join(", ")}`}</span>
              </IngredientsContainer>
            )}
            <Link to={`/search?ingredients=${ingredients.join("&")}`}>
              <button disabled={ingredients.length === 0 ? true : false}>
                Search
              </button>
            </Link>
            <button>Get random</button>
          </SearchContainer>
        </TopSection>
        <BottomSection></BottomSection>
      </ContentsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div``;

const ContentsContainer = styled.main``;

const TopSection = styled.section`
  background-image: url(${main_bg1});
  background-size: cover;
  background-position: top;
  height: 90vh;
  min-height: 30rem;
  background-color: darkslategrey;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomSection = styled.section``;

const SearchContainer = styled.div`
  width: 40vw;
  min-width: 40rem;
  height: 15rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;

  margin-top: 10rem;
  padding: 0.5rem 1rem;
  display: flex;
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
  width: 70vw;

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
`;
