import styled from "styled-components";
import { ModalBody } from "react-bootstrap";
import ingredient from "../../assets/img/ingredients.webp";
import dish from "../../assets/img/dish1.jpg";

export const Body = styled(ModalBody)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50vh;

  div:nth-child(1) {
    div {
      background-image: url(${ingredient});
    }
  }

  div:nth-child(2) {
    div {
      background-image: url(${dish});
    }
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: opacity 0.5s;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }

    div {
      width: 25rem;
      height: 25rem;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 10%;
      opacity: 0.6;

      &:active {
        transform: scale(0.96);
        transition: transform 0.1s;
      }
    }

    span {
      position: absolute;
      color: white;
      font-size: 2rem;
      z-index: 1;
      text-shadow: 2px 3px 5px #121212;
      user-select: none;
    }
  }
`;
