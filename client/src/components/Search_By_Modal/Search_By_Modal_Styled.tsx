import styled, { css, keyframes } from "styled-components";
import { Modal, ModalBody } from "react-bootstrap";
import ingredient from "../../assets/img/ingredients.webp";
import dish from "../../assets/img/dish1.jpg";

const zoomIn = keyframes`
from {
  background-size: 140%;
}
to {
  background-size: 150%;
}
`;

export const ModalContainer = styled(Modal)`
  > div {
    > .modal-content {
      border-radius: 6vh;
    }
  }
`;

export const Body = styled(ModalBody)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50vh;
  background-color: #dddddd;
  border-radius: 6vh;

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
      width: 35vh;
      height: 35vh;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 10%;
      opacity: 0.6;
      background-image: url(${ingredient});
      background-size: 140%;
      background-position: center;

      &:hover {
        animation: ${zoomIn} 0.5s ease-out;
        animation-fill-mode: forwards;
      }

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
