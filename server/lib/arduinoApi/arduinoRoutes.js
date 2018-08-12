const timezone = require("timezonecomplete");

const arduinoRoutesEnum = {
   serverTime: "/serverTime",
   wateringData: "/wateringData",
};

/**
 * @public
 * @function useIn
 * @description use the arduino routes in the web request router
 * @param {object} webRequestRouter - web request router
 * @param {object} database - app database
 */
const useIn = ({
   webRequestRouter,
   database,
}) => {
   const serverTimeFormat = "yyyy-MM-dd HH:mm:ss";
   const { services: { wateringStationDbService } } = database;

   webRequestRouter.get(arduinoRoutesEnum.serverTime,
      (request, response) => {
         const currentTimeInRome = timezone.now(timezone.zone("Europe/Rome"));
         response.send(currentTimeInRome.format(serverTimeFormat));
      });

   webRequestRouter.get(arduinoRoutesEnum.wateringData,
      (request, response) => {
         wateringStationDbService.findAllWateringStations()
            .then(wateringStations => {
               const wateringData = {};

               wateringStations.forEach((wateringStation, index) => {
                  wateringData[`Station${index}`] = wateringStation.wateringTimes;
               });

               response.send(JSON.stringify(wateringData));
            })
            .catch(error => {
               const wateringStationError = `Cannot find all watering stations because, ${error.message}`;
               response.send(wateringStationError);
            });
      });
};

export {
   useIn,
   arduinoRoutesEnum
};