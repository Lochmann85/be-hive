import gql from 'graphql-tag';

export default (wateringStationsFragment) => ({
   document: gql`
   query findAllWateringStationsQuery {
      findAllWateringStations {
         ...${wateringStationsFragment.name}
      }
   }
   ${wateringStationsFragment.document}`,
   config: {
      name: "findAllWateringStationsQuery",
      options: {
         fetchPolicy: "network-only"
      }
   }
});