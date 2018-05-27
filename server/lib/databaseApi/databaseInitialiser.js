import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

import { config } from '../config';
import * as defaultModelsLoader from './modelsLoader';
import * as defaultDbServicesLoader from './dbServicesLoader';

/**
 * @public
 * @function initialiseDatabase
 * @description initialises the database and loads all models and services
 * @param {object} databaseDriver - the module which handles the database
 * @param {object} modelsLoader - the models loader
 * @param {object} dbServicesLoader - the services loader
 * @param {object} logger - the logger
 * @returns {Promise} of database with models and services
 */
const initialiseDatabase = (
   databaseDriver = mongoose,
   modelsLoader = defaultModelsLoader,
   dbServicesLoader = defaultDbServicesLoader,
   logger = console
) => {
   return databaseDriver.createConnection(config.MONGODB_URI)
      .then(dbConnection => {
         return modelsLoader.loadModels(dbConnection);
      })
      .then(models => {
         return dbServicesLoader.loadDbServices(models)
            .then(services => {
               logger.log("Connected to database.");

               return Object.freeze({
                  models,
                  services,
               });
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