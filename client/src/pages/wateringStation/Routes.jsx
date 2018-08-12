import React from 'react';
import { Switch, Route } from 'react-router-dom';

import WateringStationOverview from './WateringStationOverview';

const routesPath = "/wateringStation";

const WateringStationRoutes = () => {
   return (
      <Switch>
         <Route exact path={WateringStationOverview.path(routesPath)} render={() => (
            <WateringStationOverview relatedPaths={WateringStationRoutes.relatedPaths} />
         )} />
      </Switch>
   );
};

WateringStationRoutes.relatedPaths = {
   wateringStationOverview: WateringStationOverview.path(routesPath),
};

WateringStationRoutes.menuGroup = {
   label: "Watering Station",
   path: routesPath,
   menuItems: [
      WateringStationOverview.menuItem(routesPath),
   ],
};

export default WateringStationRoutes;