import authenticationMiddleware from './authenticationMiddleware';
import { config } from '../config';
import * as jwtTokenHandlerFactory from '../jwtApi/jwtTokenHandler';

import graphQLNoAuthRequests from '../graphQLApi/graphQLNoAuthRequests';

/**
 * @public
 * @function initialise
 * @description initialises the authentication middleware
 * @param {object} database 
 */
const initialise = (database) => {
   const graphQLJwtTokenHandler = jwtTokenHandlerFactory.create(config.GRAPHQL_JWT_SECRET, 60 * 60 * 24 /* one day */);

   const graphQLAuthenticationMiddleware = authenticationMiddleware(graphQLJwtTokenHandler, graphQLNoAuthRequests, database);

   return Object.freeze({
      graphQLAuthenticationMiddleware,
   });
};

export {
   initialise
};