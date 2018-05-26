import { makeExecutableSchema as defaultMakeExecutableSchema } from 'graphql-tools';

import { canAddResolversToExecutable } from './services/graphQLServiceCompositions';

/**
 * @public
 * @function buildExecutableSchema
 * @description builds the executable graphQL schema
 * @param {array} graphQLServices - the graphQL services
 * @param {string} schema - type definitions for the executable schema
 * @param {function} makeExecutableSchema - the make executable schema function
 * @returns {Promise} of executable schema
 */
const buildExecutableSchema = (
   graphQLServices,
   schema,
   makeExecutableSchema = defaultMakeExecutableSchema,
) => {
   const executableSchema = makeExecutableSchema({
      typeDefs: schema
   });

   graphQLServices.forEach(graphQLService => {
      const graphQLServiceForSchema = Object.assign({}, graphQLService, canAddResolversToExecutable);

      graphQLServiceForSchema.addResolversToExecutable(executableSchema);
   });

   return Promise.resolve(executableSchema);
};

export {
   buildExecutableSchema
};