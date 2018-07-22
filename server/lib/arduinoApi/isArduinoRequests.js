
/**
 * @public
 * @function isArduinoRequests
 * @description checks if the request does not need https
 * @param {object} request - the http request
 * @returns {boolean} of allowed request
 */
const isArduinoRequests = (request) => {
   return false;
};

export default isArduinoRequests;