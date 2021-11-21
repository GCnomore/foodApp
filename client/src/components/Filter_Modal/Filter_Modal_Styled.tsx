import { ToggleButton } from "react-bootstrap";
import styled from "styled-components/macro";

export const FilterContainer = styled.main`
  > section:nth-child(1) {
    display: flex;
    flex-direction: column;

    > input {
      padding: 0.25rem 0.5rem;
      outline: none;
    }

    > ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin-top: 0.5rem;

      > li {
        margin: 0rem 1rem 0 0;
        padding-top: 1rem;
      }
    }
  }

  > section:nth-child(2) {
    > div {
      display: flex;
      margin: 1rem 0;
      > * {
        margin: 0 0.5rem;
      }
    }
  }
`;

export const DeleteIngredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    position: fixed;
    margin-bottom: 0.8rem;
    padding: 0 0.5rem;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const CustomToggleButton = styled(ToggleButton)`
  > input {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }
`;
