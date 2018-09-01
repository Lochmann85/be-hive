import gql from 'graphql-tag';

export default (wateringStationFragment) => ({
   document: gql`
   mutation updateWateringStation($wateringStationId: ID, $wateringStationData: WateringStationData) {
      updateWateringStation(wateringStationId: $wateringStationId, wateringStationData: $wateringStationData) {
         ...${wateringStationFragment.name}
      }
   }
   ${wateringStationFragment.document}`,
   config: {
      props: ({ mutate }) => ({
         updateWateringStation: (wateringStationId, wateringStationData) => {
            return mutate({
               variables: { wateringStationId, wateringStationData }
            });
         },
      }),
   }
});
