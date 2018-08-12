import React from 'react';

import { Grid } from 'semantic-ui-react';

import BaseContentLayout from '../../components/layout/BaseContentLayout';

const WateringStationOverview = () => {
   return (
      <BaseContentLayout title="Watering stations overview" >
         <Grid doubling columns={3}>
         </Grid>
      </BaseContentLayout>
   );
};

WateringStationOverview.propTypes = {
};

WateringStationOverview.path = (routePath) => `${routePath}/view`;

WateringStationOverview.menuItem = (routePath) => ({
   label: "Overview",
   path: WateringStationOverview.path(routePath)
});

export default WateringStationOverview;