import * as defaultDatabaseInitialiser from './databaseApi/databaseInitialiser';
import * as defaultGraphQLBuilder from './graphQLApi/graphQLBuilder';
import * as defaultAppServer from './serverApi/appServer';

/**
 * @public
 * @function startup
 * @description startsup the app and initialises all needed services
 * @param {object} databaseInitialiser - intialises the database
 * @param {object} graphQLBuilder - builder of the graphQL schema and services
 * @param {object} appServer - starts up the server
 * @returns {Promise} of startup
 */
const startup = (
   databaseInitialiser = defaultDatabaseInitialiser,
   graphQLBuilder = defaultGraphQLBuilder,
   appServer = defaultAppServer,
) => {
   return databaseInitialiser.initialiseDatabase()
      .then(database => {
         return graphQLBuilder.buildGraphQL(database);
      })
      .then(graphQLWrapper => {
         return appServer.startupAppServer(graphQLWrapper.executableSchema);
      });
};

export {
   startup,
};