import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { Message } from 'semantic-ui-react';

import BaseContentLayout from '../../components/layout/BaseContentLayout';
import findWateringStationQueryTemplate from './graphql/queries/findWateringStation';

class UpdateWateringStation extends React.Component {

   static path = (routePath) => `${routePath}/update`;
   static wildcard = "/:wateringStationId";

   static propTypes = {
      relatedPaths: PropTypes.shape({
         wateringStationOverview: PropTypes.string.isRequired
      }).isRequired,
   }

   constructor(props) {
      super(props);

      this.state = {
         errors: []
      };
   }

   render() {
      const { findWateringStationQuery: { findWateringStation } } = this.props;

      let updateWateringStationContent,
         title;

      if (findWateringStation) {
         title = `Update watering station: ${findWateringStation.name}`;
         updateWateringStationContent = (
            <div>
               {findWateringStation.description}
               {findWateringStation.isActive}
            </div>
         );
      }
      else {
         title = "";
         updateWateringStationContent = <Message visible content="Watering station could not be found" />;
      }

      return (
         <BaseContentLayout title={title}>
            {updateWateringStationContent}
         </BaseContentLayout>
      );
   }
};

const wateringStationFragment = {
   name: "WateringStationUpdate",
   document: gql`
   fragment WateringStationUpdate on WateringStation {
      id
      name
      description
      isActive
      wateringTimes {
         id
         duration
         time
      }
   }`
};

const findWateringStationQuery = findWateringStationQueryTemplate(wateringStationFragment);

export default compose(
   graphql(findWateringStationQuery.document, findWateringStationQuery.config),
)(UpdateWateringStation);
