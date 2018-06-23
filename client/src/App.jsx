import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { Grid } from 'semantic-ui-react';

import { NoSideMarginGrid } from './assets/styles/UI';

import Navigation from './components/navigation/Navigation';
import checkViewerQueryTemplate from './checkViewer';

import PrivateRoutes from './pages/PrivateRoutes';
import ErrorPage from './pages/error/ErrorPage';

import './helper/initialiseGlobalStyles';

const MainNavigationColumn = styled(Grid.Column)`
   padding-left: 0!important;
   padding-right: 0!important;
`;

const App = (props) => {
   const {
      checkViewerQuery
   } = props;

   let viewer = checkViewerQuery.checkViewer;

   return (
      <React.Fragment>
         <NoSideMarginGrid stretched>
            <Grid.Row>
               <MainNavigationColumn>
                  <Navigation viewer={viewer} />
               </MainNavigationColumn>
            </Grid.Row>
         </NoSideMarginGrid>
         <Switch>
            <Route path={ErrorPage.path} render={(props) => <ErrorPage {...props} />} />
            <Route path={PrivateRoutes.path} component={() => <PrivateRoutes />} />
         </Switch>
      </React.Fragment>
   );
};

App.fragments = {
   viewer: {
      name: "AppViewer",
      document: gql`
      fragment AppViewer on Viewer {
         ...${Navigation.fragments.viewer.name}
      }
      ${Navigation.fragments.viewer.document}`
   }
};

const checkViewerQuery = checkViewerQueryTemplate(App.fragments.viewer);

export default graphql(
   checkViewerQuery.document, checkViewerQuery.config
)(App);