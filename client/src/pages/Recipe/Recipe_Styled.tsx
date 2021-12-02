import styled from "styled-components";

export const RecipePageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > section {
    display: flex;
    justify-content: center;
    width: 10%;
  }
`;

export const ContentsContainer = styled.main`
  display: flex;
  flex-direction: column;
`;

export const ImageContainer = styled.section``;

export const MetaContainer = styled.section`
  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 2rem;
  }
`;

export const InformationContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AdditionalInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
  }
`;

export const InstructionContainer = styled.section``;

export const WinePairing = styled.section``;
