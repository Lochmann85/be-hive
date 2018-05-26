import * as defaultModelFactories from './models';

/**
 * @public
 * @function loadModels
 * @description loads all models from the schema files
 * @param {object} dbConnection - the connection to the database
 * @param {object} modelFactories - the model factories which create the models
 * @returns {Promise} of database models
 */
const loadModels = (
   dbConnection,
   modelFactories = defaultModelFactories,
) => {
   return Promise.all(Object.keys(modelFactories).map(factory =>
      modelFactories[factory].create(dbConnection)
   )).then(createdModels => {
      const models = {};

      createdModels.forEach(createdModel => {
         models[createdModel.name] = createdModel.schema;
      });

      return models;
   });
};

export {
   loadModels
};