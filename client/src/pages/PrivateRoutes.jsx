import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';

import UserRoutes from './user/Routes';
import WateringStationRoutes from './wateringStation/Routes';

const viewerFragment = {
   name: "PrivateRoutesViewer",
   document: gql`
      fragment PrivateRoutesViewer on Viewer {
         ...${UserRoutes.fragments.viewer.name}
      }
      ${UserRoutes.fragments.viewer.document}`
};

const PrivateRoutes = ({ viewer }) => (
   <Switch>
      <Route path={UserRoutes.menuGroup.path} render={() => <UserRoutes viewer={viewer} />} />
      <Route path={WateringStationRoutes.menuGroup.path} component={WateringStationRoutes} />
   </Switch>
);

PrivateRoutes.path = "/";
PrivateRoutes.navigation = [
   UserRoutes.menuGroup,
   WateringStationRoutes.menuGroup
];

PrivateRoutes.fragments = {
   viewer: viewerFragment,
};

PrivateRoutes.propTypes = {
   viewer: propType(viewerFragment.document)
};

export default PrivateRoutes;