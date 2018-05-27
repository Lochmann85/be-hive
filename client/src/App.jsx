import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Grid } from 'semantic-ui-react';

import Navigation from './components/navigation/Navigation';

import PrivateRoutes from './pages/PrivateRoutes';
import ErrorPage from './pages/error/ErrorPage';

import './helper/initialiseGlobalStyles';

const App = () => (
   <React.Fragment>
      <Grid stretched>
         <Grid.Row>
            <Grid.Column>
               <Navigation />
            </Grid.Column>
         </Grid.Row>
      </Grid>
      <Switch>
         <Route path={ErrorPage.path} render={(props) => <ErrorPage {...props} />} />
         <Route path={PrivateRoutes.path} component={() => <PrivateRoutes />} />
      </Switch>
   </React.Fragment>
);

export default App;