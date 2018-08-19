import React from 'react';
import { Switch, Route } from 'react-router-dom';

import WateringStationOverview from './WateringStationOverview';
import UpdateWateringStation from './UpdateWateringStation';

const routesPath = "/wateringStation";

const WateringStationRoutes = () => {
   return (
      <Switch>
         <Route exact path={WateringStationOverview.path(routesPath)} render={() => (
            <WateringStationOverview relatedPaths={WateringStationRoutes.relatedPaths} />
         )} />
         <Route exact path={UpdateWateringStation.path(routesPath) + UpdateWateringStation.wildcard} render={(routerProps) => (
            <UpdateWateringStation relatedPaths={WateringStationRoutes.relatedPaths} {...routerProps} />
         )} />
      </Switch>
   );
};

WateringStationRoutes.relatedPaths = {
   wateringStationOverview: WateringStationOverview.path(routesPath),
   updateWateringStation: UpdateWateringStation.path(routesPath),
};

WateringStationRoutes.menuGroup = {
   label: "Watering Station",
   mobileIcon: "ficon-water",
   path: routesPath,
   menuItems: [
      WateringStationOverview.menuItem(routesPath),
   ],
};

export default WateringStationRoutes;