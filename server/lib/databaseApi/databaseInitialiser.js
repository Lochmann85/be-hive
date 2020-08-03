import * as defaultDbServicesLoader from './dbServicesLoader';

/**
 * @public
 * @function initialiseDatabase
 * @description initialises the database and loads all models and services
 * @param {object} dbServicesLoader - the services loader
 * @param {object} logger - the logger
 * @returns {Promise} of database with models and services
 */
const initialiseDatabase = (
   dbServicesLoader = defaultDbServicesLoader,
   logger = console
) => {
   return dbServicesLoader.loadDbServices()
      .then(services => {
         return Object.freeze({
            services,
         });
      })
      .catch(error => {
         const initialiseError = new Error(`Could not initialise database because of ${error.message}`);
         logger.error(initialiseError.message);
         return Promise.reject(initialiseError);
      });
};

export {
   initialiseDatabase,
};