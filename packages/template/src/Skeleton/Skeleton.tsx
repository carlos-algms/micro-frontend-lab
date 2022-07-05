import styled from 'styled-components';
import { GlobalStyle } from './GlobalStyles';

export default function Skeleton() {
  return (
    <>
      <GlobalStyle />
      <WrapperStyled>
        <HeaderStyled></HeaderStyled>
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
`;

const HeaderStyled = styled.header`
  flex-grow: 0;
`;

const AsideStyled = styled.aside`
  flex-grow: 0;
`;

const MainStyled = styled.main`
  flex-grow: 1;
`;

const MainWrapperStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;
