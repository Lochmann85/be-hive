import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { Card, Message } from 'semantic-ui-react';

import BaseContentLayout from '../../components/layout/BaseContentLayout';
import QueryLoader from '../../components/layout/QueryLoader';
import WateringStationPreview from './components/WateringStationPreview';

import findAllWateringStationsQuery from './graphql/queries/findAllWateringStations';

const WateringStationOverview = (props) => {
   const {
      findAllWateringStationsQuery,
      relatedPaths
   } = props;

   let content;
   if (findAllWateringStationsQuery && findAllWateringStationsQuery.findAllWateringStations) {
      const wateringStations = findAllWateringStationsQuery.findAllWateringStations.map((wateringStation, index) =>
         <WateringStationPreview
            key={index}
            wateringStation={wateringStation}
            relatedUpdatePath={relatedPaths.updateWateringStation} />
      );

      content = (
         <Card.Group doubling stackable itemsPerRow={4}>
            {wateringStations}
         </Card.Group>
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

WateringStationOverview.propTypes = {
   relatedPaths: PropTypes.shape({
      updateWateringStation: PropTypes.string.isRequired,
   }).isRequired,
};

const wateringStationsFragment = {
   name: "WateringStationsOverview",
   document: gql`
   fragment WateringStationsOverview on WateringStation {
      id
      ...${WateringStationPreview.fragments.wateringStation.name}
   }
   ${WateringStationPreview.fragments.wateringStation.document}`
};

WateringStationOverview.fragments = {
   wateringStations: wateringStationsFragment
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