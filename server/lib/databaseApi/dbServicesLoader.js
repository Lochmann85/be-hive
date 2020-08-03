import * as defaultDbServiceFactories from './services';

/**
 * @public
 * @function loadDbServices
 * @description loads all database services
 * @param {object} dbServiceFactories - the service factories which create the database services
 * @returns {Promise} of database services
 */
const loadDbServices = (
   dbServiceFactories = defaultDbServiceFactories,
) => {
   return Promise.all(Object.keys(dbServiceFactories).map(factory =>
      dbServiceFactories[factory].create()
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