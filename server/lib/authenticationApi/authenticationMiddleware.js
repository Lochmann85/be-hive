import {
   forbiddenError,
   authenticationError
} from '../errorApi';

/**
 * @public
 * @function authenticationMiddleware
 * @description express middleware for authentication
 * @param {object} tokenHandler - the token handler
 * @param {function} allowedRequests - the function which checks the possible requests
 * @param {function} database - the database
 */
export default (tokenHandler, allowedRequests, database) => {
   const {
      services: {
         userDbService,
      },
   } = database;

   /**
    * @private
    * @function _checkForAllowedRequests
    * @description checks for the requests which do not need authorization
    * @param {object} request - the http request
    * @returns {Promise} of allowed requests
    */
   const _checkForAllowedRequests = (request) => new Promise((resolve, reject) => {
      try {
         if (allowedRequests(request)) {
            Object.assign(request.headers, {
               tokenHandler,
            });
            resolve();
         }
         else {
            reject(authenticationError);
         }
      } catch (error) {
         reject(forbiddenError);
      }
   });

   /**
    * @private
    * @function _getEncryptedTokenFromHeaders
    * @description retrieves the jwt token from the request header
    * @param {object} headers - the http request
    * @returns {string} token or undefined
    */
   const _getEncryptedTokenFromHeaders = (headers) => {
      if (headers && headers.token) {
         return headers.token;
      }
   };

   /**
    * @public
    * @function middleware
    * @param {object} request - the http request
    * @param {object} response - the http response
    * @param {object} next - the next function in the middleware
    */
   return (request, response, next) => {
      const encryptedToken = _getEncryptedTokenFromHeaders(request.headers);

      if (encryptedToken) {
         tokenHandler.validate(encryptedToken).then(tokenData => {
            userDbService.findUser(tokenData.userId)
               .then(knownViewer => {
                  Object.assign(request.headers, {
                     viewer: knownViewer,
                     tokenHandler
                  });
                  next();
               })
               .catch(error => next(error));
         }).catch(error => {
            _checkForAllowedRequests(request)
               .then(() => next())
               .catch(error => next(error));
         });
      }
      else {
         _checkForAllowedRequests(request)
            .then(() => next())
            .catch(error => next(error));
      }
   };
};

