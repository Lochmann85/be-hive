
/**
 * @public
 * @function useIn
 * @description use the arduino routes in the web request router
 * @param {object} webRequestRouter - web request router
 * @param {object} authenticationMiddlewares - authentication middlewares
 */
const useIn = (
   webRequestRouter,
   authenticationMiddlewares,
) => {
   const { arduinoAuthenticationMiddleware } = authenticationMiddlewares;

   const serverTimeOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
   };

   webRequestRouter.get("/serverTime",
      arduinoAuthenticationMiddleware,
      (request, response) => {
         response.send(new Date().toLocaleDateString("de-DE", serverTimeOptions));
      });
};

export {
   useIn,
};