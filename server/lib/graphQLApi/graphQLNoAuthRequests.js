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
   let requestAllowed = false;

   if (request.body && request.body.query) {
      const { body: { query } } = request;
      notAuthenticatedRequests.forEach(allowedRequest => {
         if (query.includes(allowedRequest)) {
            requestAllowed = true;
         }
      });
   }

   return requestAllowed;
};

export default graphQLNoAuthRequests;