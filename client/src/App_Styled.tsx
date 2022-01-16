import styled from "styled-components/macro";

export const AppContainer = styled.div`
  background-color: #EEEEEE;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const NavBar = styled.nav`
  width: 100%;
  height: 2.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;

  > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    > * {
      color: white;
      font-weight: bold;
      text-decoration: none;
      margin: 0 1rem;
    }
  }
`;
