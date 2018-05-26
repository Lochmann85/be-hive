import * as defaultGraphQLServicesLoader from './graphQLServicesLoader';
import * as defaultSchemaTemplate from './schemaTemplate';
import * as defaultExecutableSchemaBuilder from './executableSchemaBuilder';

/**
 * @public
 * @function buildGraphQL
 * @description builds the graphQL services and the executable schema
 * @param {object} database - the database wrapper
 * @param {object} graphQLServicesLoader - the services loader
 * @param {object} schemaTemplate - the schema template which will be filled
 * @param {object} executableSchemaBuilder - the executable schema builder
 * @returns {Promise} of graphQL services and executable schema
 */
const buildGraphQL = (
   database,
   graphQLServicesLoader = defaultGraphQLServicesLoader,
   schemaTemplate = defaultSchemaTemplate,
   executableSchemaBuilder = defaultExecutableSchemaBuilder,
) => {
   return graphQLServicesLoader.loadGraphQLServices(database)
      .then(graphQLServices => {
         return schemaTemplate.fillSchemaTemplate(graphQLServices)
            .then(schema => {
               return executableSchemaBuilder.buildExecutableSchema(graphQLServices, schema);
            })
            .then(executableSchema => {
               return Object.freeze({
                  services: graphQLServices,
                  executableSchema
               });
            });
      });
};

export {
   buildGraphQL
};