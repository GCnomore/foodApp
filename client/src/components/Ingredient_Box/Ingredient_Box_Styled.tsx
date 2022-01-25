import styled from "styled-components/macro";

export const DeleteIngredButtonContainer = styled.div`
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

export const IngredientBoxContainer = styled.li`
  > span {
    color: white;
    background-color: #191919df;
    padding: 0.25rem 1rem;
    border-radius: 1rem;

    &:hover {
      cursor: pointer;
    }
  }
`;
