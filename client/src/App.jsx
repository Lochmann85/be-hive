import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { Grid } from 'semantic-ui-react';

import { NoSideMarginGrid } from './assets/styles/UI';

import Navigation from './components/navigation/Navigation';

import PrivateRoutes from './pages/PrivateRoutes';
import ErrorPage from './pages/error/ErrorPage';

import './helper/initialiseGlobalStyles';

const MainNavigationColumn = styled(Grid.Column)`
   padding-left: 0!important;
   padding-right: 0!important;
`;

const App = () => (
   <React.Fragment>
      <NoSideMarginGrid stretched>
         <Grid.Row>
            <MainNavigationColumn>
               <Navigation />
            </MainNavigationColumn>
         </Grid.Row>
      </NoSideMarginGrid>
      <Switch>
         <Route path={ErrorPage.path} render={(props) => <ErrorPage {...props} />} />
         <Route path={PrivateRoutes.path} component={() => <PrivateRoutes />} />
      </Switch>
   </React.Fragment>
);

export default App;