import * as defaultGraphQLServiceFactories from './services';

/**
 * @public
 * @function loadGraphQLServices
 * @description loads all graphQL services
 * @param {object} database - the database wrapper
 * @param {object} graphQLServiceFactories - the service factories which create the services
 * @returns {Promise} of graphQL services
 */
const loadGraphQLServices = (
   database,
   graphQLServiceFactories = defaultGraphQLServiceFactories,
) => {
   return Promise.all(Object.keys(graphQLServiceFactories).map(factory =>
      graphQLServiceFactories[factory].create(database)
   ));
};

export {
   loadGraphQLServices
};