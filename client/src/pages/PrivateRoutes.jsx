import React from 'react';

import { Switch } from 'react-router-dom';

// import UserRoutes from './user/Routes';

const PrivateRoutes = () => (
   <Switch>
   </Switch>
);

PrivateRoutes.path = "/";
PrivateRoutes.navigation = [
   // UserRoutes.menuGroup
];

export default PrivateRoutes;