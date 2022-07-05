import styled from 'styled-components';
import { GlobalStyle } from './GlobalStyles';

export default function Skeleton() {
  return (
    <>
      <GlobalStyle />
      <WrapperStyled>
        <HeaderStyled>
          <div id="single-spa-application:header" />
        </HeaderStyled>
        <MainWrapperStyled>
          <AsideStyled></AsideStyled>
          <MainStyled></MainStyled>
        </MainWrapperStyled>
      </WrapperStyled>
    </>
  );
}

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #d9d7d7;
`;

const HeaderStyled = styled.header`
  flex-grow: 0;
  background-color: royalblue;
  color: white;
  padding: 10px;
`;

const AsideStyled = styled.aside`
  flex-grow: 0;
  background-color: purple;
  min-width: 60px;
`;

const MainStyled = styled.main`
  flex-grow: 1;
  background-color: #f2f2f2;
`;

const MainWrapperStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  background-color: #52afaf;
`;
