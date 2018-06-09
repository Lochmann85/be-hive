
/**
 * @public
 * @function arduinoNoAuthRequests
 * @description checks if the request does not need authentication
 * @param {object} request - the http request
 * @returns {boolean} of allowed request
 */
const arduinoNoAuthRequests = (request) => {
   return false;
};

export default arduinoNoAuthRequests;