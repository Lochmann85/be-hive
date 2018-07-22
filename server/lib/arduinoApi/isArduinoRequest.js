import { arduinoRoutesEnum } from './arduinoRoutes';

/**
 * @public
 * @function isArduinoRequest
 * @description checks if the request does not need https
 * @param {object} request - the http request
 * @returns {boolean} of allowed request
 */
const isArduinoRequest = (request) => {
   let foundArduinoRequest = false;

   Object.keys(arduinoRoutesEnum).forEach(key => {
      if (request && request.originalUrl && arduinoRoutesEnum[key]) {
         if (request.originalUrl === arduinoRoutesEnum[key]) {
            foundArduinoRequest = true;
         }
      }
   });

   return foundArduinoRequest;
};

export default isArduinoRequest;