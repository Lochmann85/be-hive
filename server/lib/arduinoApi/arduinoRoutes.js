
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
   const serverTimeOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
   };

   webRequestRouter.get(arduinoRoutesEnum.serverTime,
      (request, response) => {
         response.send(new Date().toLocaleDateString("de-DE", serverTimeOptions));
      });
};

export {
   useIn,
   arduinoRoutesEnum
};