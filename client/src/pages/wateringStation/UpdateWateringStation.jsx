import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { Message } from 'semantic-ui-react';

import BaseContentLayout from '../../components/layout/BaseContentLayout';
import WateringStationForm from './components/WateringStationForm';
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
         updateWateringStationContent = <WateringStationForm
            wateringStation={findWateringStation}
            onSubmit={this._onSubmit}
            errors={this.state.errors}
            submitButtonTitle="Update" />;
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

   _onSubmit = (wateringStationData) => {
      console.log(wateringStationData)
   };

   _onShowError = (errors) => this.setState({ errors });
};

const wateringStationFragment = {
   name: "WateringStationUpdate",
   document: gql`
   fragment WateringStationUpdate on WateringStation {
      id
      name
      ...${WateringStationForm.fragments.wateringStation.name}
   }
   ${WateringStationForm.fragments.wateringStation.document}`
};

const findWateringStationQuery = findWateringStationQueryTemplate(wateringStationFragment);

export default compose(
   graphql(findWateringStationQuery.document, findWateringStationQuery.config),
)(UpdateWateringStation);
