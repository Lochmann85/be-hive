import React from 'react';

import { Switch, Route } from 'react-router-dom';

import UserRoutes from './user/Routes';

const PrivateRoutes = () => (
   <Switch>
      <Route path={UserRoutes.menuGroup.path} component={UserRoutes} />
   </Switch>
);

PrivateRoutes.path = "/";
PrivateRoutes.navigation = [
   UserRoutes.menuGroup
];

export default PrivateRoutes;