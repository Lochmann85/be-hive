import * as services from './services';

const notAuthenticatedRequests = [];
Object.keys(services).forEach(serviceKey => {
   services[serviceKey].noAuthRequest.forEach(request => {
      notAuthenticatedRequests.push(request);
   });
});

/**
 * @public
 * @function graphQLNoAuthRequests
 * @description checks if the request does not need authentication
 * @param {object} request - the http request
 * @returns {boolean} of allowed request
 */
const graphQLNoAuthRequests = (request) => {
   if (request.body && request.body.operationName && request.body.query) {
      const { body: { operationName, query } } = request;
      notAuthenticatedRequests.forEach(allowedRequest => {
         if (operationName === allowedRequest.operationName && query.includes(allowedRequest.searchString)) {
            return true;
         }
      });
   }
   return false;
};

export default graphQLNoAuthRequests;