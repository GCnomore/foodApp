import styled from "styled-components/macro";

export const RecipePageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    padding: 0;
    margin: 0;
    li {
      list-style: none;
    }
  }
`;

export const AdSection = styled.section`
  height: 100%;
  width: 30%;
  margin: 0 2rem;
  display: flex;
  justify-content: center;
`;

export const ContentsContainer = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 5% 5rem;
`;

export const ImageContainer = styled.section`
  margin-bottom: 5%;
`;

export const TitleContainer = styled.div`
  h1 {
    font-size: 2rem;
  }
`;

export const MetaContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
  }
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;

  > div {
    display: flex;
    margin-bottom: 1rem;

    span {
      margin-right: 1rem;
    }

    ul {
      display: flex;
      list-style: none;

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
`;

export const AdditionalInfoContainer = styled(InformationContainer)`
  margin-top: 0;
`;

export const InstructionContainer = styled.section`
  ol {
    li {
      font-size: 1.2rem;
      margin: 2rem 0;
    }
  }
`;

export const WinePairing = styled.section``;
