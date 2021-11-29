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
