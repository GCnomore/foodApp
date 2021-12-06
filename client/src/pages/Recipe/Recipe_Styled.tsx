import styled from "styled-components";

export const RecipePageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    padding: 0;
  }
`;

export const AdSection = styled.section`
  width: 10%;
  display: flex;
  justify-content: center;
`;

export const ContentsContainer = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80%;

  margin: 5% 0;
`;

export const ImageContainer = styled.section`
  margin-bottom: 5%;
`;

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

  > div {
    ul {
      display: flex;
      list-style: none;

      span {
        display: flex;

        &:first-child {
          margin-right: 0.5rem;
        }
        &:last-child {
          li {
            margin-right: 0.5rem;
            text-decoration: underline;
          }
        }
      }
    }
    ul:first-child {
    }
  }
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
