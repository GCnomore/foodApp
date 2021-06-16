import { useState } from "react";
import SearchResult from "./search/SearchResult";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import styled from "styled-components/macro";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";

export default function Home() {
  const [searchBy, setSearchBy] = useState("");
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
                placeholder={
                  searchBy === "ingredients" ? "Add your ingredients" : "Search"
                }
                onChange={(e) => {
                  setSeacrh(e.target.value);
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIngredients((prev) => [...prev, search]);
                  console.log(ingredients);
                }}
              >
                Add ingredient
              </button>
            </div>
            <span>
              {ingredients.length === 0 ? "Your ingredients" : `${ingredients}`}
            </span>
            <button disabled={search === "" ? true : false}>Search</button>
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
  height: 60vh;
  min-height: 30rem;
  background-color: darkslategrey;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomSection = styled.section``;

const SearchContainer = styled.div`
  width: 70vw;
  height: 20vh;
  background-color: orange;

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

  > button {
    width: 100%;
  }

  > div:nth-child(1) {
    > button {
      height: 1.5rem;
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
  text-align: start;
`;
