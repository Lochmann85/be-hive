import * as defaultDbServiceFactories from './services';

/**
 * @public
 * @function loadDbServices
 * @description loads all database services
 * @param {object} models - the database models
 * @param {object} dbServiceFactories - the service factories which create the database services
 * @returns {Promise} of database services
 */
const loadDbServices = (
   models,
   dbServiceFactories = defaultDbServiceFactories,
) => {
   return Promise.all(Object.keys(dbServiceFactories).map(factory =>
      dbServiceFactories[factory].create(models)
   )).then(createdServices => {
      const services = {};

      createdServices.forEach(createdService => {
         services[createdService.name] = createdService.services;
      });

      return services;
   });
};

export {
   loadDbServices
};