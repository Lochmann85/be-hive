import {
   addResolveFunctionsToSchema as defaultAddResolveFunctionsToSchema
} from 'graphql-tools';

/**
 * @public
 * @member canAddTypesToSchema
 * @description wrapper for the addTypesToSchema functionality, used as composition
 * adds all defined graphQL schema strings to the global schema
 * @param {object} schema - the graphQL schema containing queries, types, mutations and subscriptions strings
 */
const canAddTypesToSchema = Object.freeze({
   addTypesToSchema(schema) {
      if (this.queries) {
         schema.queries += this.queries;
      }
      if (this.types) {
         schema.types += this.types;
      }
      if (this.mutations) {
         schema.mutations += this.mutations;
      }
      if (this.subscriptions) {
         schema.subscriptions += this.subscriptions;
      }
   }
});

/**
 * @public
 * @member canAddResolversToExecutable
 * @description wrapper for the addResolversToExecutable functionality, used as composition
 * adds all defined graphQL schema resolvers to the global executable schema
 * @param {object} executableSchema - the graphQL executable schema
 * @param {function} addResolveFunctionsToSchema - the function to add the resolvers to the executable schema
 */
const canAddResolversToExecutable = Object.freeze({
   addResolversToExecutable(
      executableSchema,
      addResolveFunctionsToSchema = defaultAddResolveFunctionsToSchema
   ) {
      if (this.queriesResolver) {
         addResolveFunctionsToSchema({
            schema: executableSchema,
            resolvers: {
               Query: this.queriesResolver
            }
         });
      }
      if (this.mutationsResolver) {
         addResolveFunctionsToSchema({
            schema: executableSchema,
            resolvers: {
               Mutation: this.mutationsResolver
            }
         });
      }
      if (this.subscriptionsResolver) {
         addResolveFunctionsToSchema({
            schema: executableSchema,
            resolvers: {
               Subscription: this.subscriptionsResolver
            }
         });
      }
   }
});

export {
   canAddTypesToSchema,
   canAddResolversToExecutable
};