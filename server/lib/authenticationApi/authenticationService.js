import authenticationMiddleware from './authenticationMiddleware';

import graphQLNoAuthRequests from './../graphQLApi/graphQLNoAuthRequests';
import arduinoNoAuthRequests from './../arduinoApi/arduinoNoAuthRequests';

const graphQLJwtTokenHandler = {};
const arduinoJwtTokenHandler = {};

/**
 * @public
 * @function initialise
 * @description initialises the authentication middleware
 * @param {object} database 
 */
const initialise = (database) => {
   const graphQLAuthenticationMiddleware = authenticationMiddleware(graphQLJwtTokenHandler, graphQLNoAuthRequests, database);
   const arduinoAuthenticationMiddleware = authenticationMiddleware(arduinoJwtTokenHandler, arduinoNoAuthRequests, database);

   return Object.freeze({
      graphQLAuthenticationMiddleware,
      arduinoAuthenticationMiddleware,
   });
};

export {
   initialise
};