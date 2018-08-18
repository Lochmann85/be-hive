import gql from 'graphql-tag';

export default (wateringStationFragment) => ({
   document: gql`
   query findWateringStationQuery($wateringStationId: ID!) {
      findWateringStation(wateringStationId: $wateringStationId) {
         ...${wateringStationFragment.name}
      }
   }
   ${wateringStationFragment.document}`,
   config: {
      name: "findWateringStationQuery",
      options: (ownProps) => {
         return {
            variables: { wateringStationId: ownProps.match.params.wateringStationId }
         };
      }
   }
});