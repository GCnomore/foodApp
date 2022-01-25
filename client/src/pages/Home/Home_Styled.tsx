import { Dropdown } from "react-bootstrap";
import styled from "styled-components/macro";

// import main_bg1 from "../../assets/img/main_bg/main_bg1.webp";
import main_bg2 from "../../assets/img/main_bg/main_bg2.webp";
// import main_bg3 from "../../assets/img/main_bg/main_bg3.webp";
// import main_bg5 from "../../assets/img/main_bg/main_bg5.webp";

export const HomeContainer = styled.main``;

export const ContentsContainer = styled.div``;

// const bg1 = `background-image: url(${main_bg1}); background-size: cover; background-position: top;`;
const bg2 = `background-image: url(${main_bg2}); background-size: cover; background-position: bottom;`;
// const bg3 = `background-image: url(${main_bg3}); background-size: cover; background-position: center;`;
// const bg5 = `background-image: url(${main_bg5}); background-size: cover; background-position: bottom;`;

const boxShadow = "5px 6px 6px 1px rgba(0, 0, 0, 0.6)";

export const TopSection = styled.section`
  ${bg2}
  height: 100vh;
  min-height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 5rem;
  font-size: 4rem;
  color: white;

  > h1 {
    margin: 0;
  }
`;

export const FoodTriviaContainer = styled.div`
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

export const BottomSection = styled.section``;

export const SearchContainer = styled.div`
  width: 40vw;
  min-width: 45rem;
  height: fit-content;
  max-height: 40%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  margin-top: 10rem;
  padding: 1rem 3rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: calc(40vw * 0.015);

  > * {
    margin: 0.25rem 0;
  }

  > button {
    width: 100%;
    height: 2rem;
    border: none;
    border-radius: 4px;
    box-shadow: ${boxShadow};
    margin-top: 1rem;

    &:active {
      transform: scale(0.98);
      transition: transform 0.15s linear;
    }
  }

  > button:nth-child(4) {
    background-color: #57f057;

    &:disabled {
      background-color: white;
      opacity: 0.3;
    }
  }

  > div:nth-child(1) {
    > span {
      font-size: 1.2rem;
    }

    > button {
      background: none;
      border: none;
      outline: none;
      color: white;
      font-size: 1.3rem;
      text-decoration: underline;
    }
  }

  > div:nth-child(2) {
    margin-bottom: 1rem;
    display: flex;
    width: 100%;
    height: 2.5rem;
    > input {
      width: 100%;
      outline: none;
      border: none;
      box-shadow: ${boxShadow};
      border-radius: 4px;
      padding: 0 1rem;
    }
  }
`;

export const DropDownToggle = styled(Dropdown.Toggle)`
  width: 100%;
`;

export const DropDownMenu = styled(Dropdown.Menu)`
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

export const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-shadow: 2px 2px 8px black;
  margin-bottom: 1rem;

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

export const RankingContainer = styled.div`
  display: flex;
  justify-content: center;

  > div {
    margin: 1rem 10rem;
  }
`;
