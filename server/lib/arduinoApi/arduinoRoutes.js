const timezone = require("timezonecomplete");

const arduinoRoutesEnum = {
   serverTime: "/serverTime"
};

/**
 * @public
 * @function useIn
 * @description use the arduino routes in the web request router
 * @param {object} webRequestRouter - web request router
 */
const useIn = (
   webRequestRouter,
) => {
   const serverTimeFormat = "yyyy-MM-dd HH:mm:ss";

   webRequestRouter.get(arduinoRoutesEnum.serverTime,
      (request, response) => {
         const currentTimeInRome = timezone.now(timezone.zone("Europe/Rome"));
         response.send(currentTimeInRome.format(serverTimeFormat));
      });
};

export {
   useIn,
   arduinoRoutesEnum
};