import styled from 'styled-components';
import { GlobalStyle } from './GlobalStyles';

import Parcel from 'single-spa-react/parcel';

export default function Skeleton() {
  return (
    <>
      <GlobalStyle />
      <WrapperStyled>
        <HeaderStyled>
          {/*
            This id is the default option for the single-spa to mount an Application

          */}
          <div id="single-spa-application:header" />
        </HeaderStyled>
        <MainWrapperStyled>
          <AsideStyled></AsideStyled>
          <MainStyled>
            <h1>Skeleton</h1>
            <p>This is the empty blue header and the purple sidebar</p>
            <p>It is coming from the template package</p>
            <p>It is being lazy loaded via import()</p>

            <hr />

            <Parcel config={() => import('../Box/BoxSpa')}>
              <p>This is a Parcel being lazy loaded via import()</p>
              <p>It should work the same, if used with a remote module</p>
              <p>The Parcel is a Box component, and this text is being passed as children.</p>
            </Parcel>
          </MainStyled>
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
