
/**
 * @public
 * @function respondWithError
 * @description respond of express server with a json error message
 * @param {object} error - error
 * @param {object} response - response from server
 * @param {object} next - next middleware
 */
const respondWithError = (error, response, next) => {
   if (!response.headersSent) {
      response.statusCode = error.statusCode || error.status || 500;
      response.send(JSON.stringify({
         data: null,
         errors: [{ message: error.message }]
      }));
   }
   if (typeof next === "function") {
      next(error);
   }
};

export default respondWithError;