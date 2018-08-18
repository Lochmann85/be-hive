import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { Grid, Message } from 'semantic-ui-react';

import BaseContentLayout from '../../components/layout/BaseContentLayout';
import QueryLoader from '../../components/layout/QueryLoader';

import findAllWateringStationsQuery from './graphql/queries/findAllWateringStations';

const WateringStationOverview = (props) => {
   const { findAllWateringStationsQuery } = props;

   let content;
   if (findAllWateringStationsQuery && findAllWateringStationsQuery.findAllWateringStations) {
      content = (
         <Grid doubling columns={3}>
         </Grid>
      );
   }
   else {
      content = <Message visible content={"No watering stations found"} />;
   }

   return (
      <BaseContentLayout title="Watering stations overview" >
         <QueryLoader query={findAllWateringStationsQuery}>
            {content}
         </QueryLoader>
      </BaseContentLayout>
   );
};

const wateringStationsFragment = {
   name: "WateringStationsOverview",
   document: gql`
   fragment WateringStationsOverview on WateringStation {
      id
      name
      description
      isActive
      wateringTimes {
         duration
         time
      }
   }`
};

WateringStationOverview.path = (routePath) => `${routePath}/view`;

WateringStationOverview.menuItem = (routePath) => ({
   label: "Overview",
   path: WateringStationOverview.path(routePath)
});

const queryDefinition = findAllWateringStationsQuery(wateringStationsFragment);

export default graphql(queryDefinition.document, queryDefinition.config)(
   WateringStationOverview
);