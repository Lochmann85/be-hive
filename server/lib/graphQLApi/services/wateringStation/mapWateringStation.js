/**
 * @public
 * @function mapWateringStation
 * @description maps the watering station db entry to graphql data
 * @param {object} wateringStation - the watering station db entry
 * @returns {object} watering station for graphql response
 */
const mapWateringStation = (wateringStation) => {
   const mappedWateringTimes = wateringStation.wateringTimes.map((watering, index) => ({
      id: `${wateringStation.id}${index}`,
      time: watering.time,
      duration: watering.duration
   }));

   return {
      id: wateringStation.id,
      wateringTimes: mappedWateringTimes,
      name: wateringStation.name,
      description: wateringStation.description,
      isActive: wateringStation.isActive
   };
};

export default mapWateringStation;