import { canAddTypesToSchema } from './services/graphQLServiceCompositions';

/**
 * @public
 * @function schemaTemplateSkeleton
 * @description basic schema will be filled with the strings
 * @param {object} combinedStringsFromGraphQLServices - the combined strings from the graphQL services
 * @returns {string} graphQL schema
 */
const schemaTemplateSkeleton = (combinedStringsFromGraphQLServices) => {
   const {
      types,
      queries,
      mutations,
      subscriptions,
   } = combinedStringsFromGraphQLServices;

   return `
      ${types}
      type Query {
         ${queries}
      }
      ${mutations ? `type Mutation {
         ${mutations}
      }` : ""}
      ${subscriptions ? `type Subscription {
         ${subscriptions}
      }` : ""}
      schema {
         query: Query
         ${mutations ? "mutation: Mutation" : ""}
         ${subscriptions ? "subscription: Subscription" : ""}
      }
   `;
};

/**
 * @public
 * @function fillSchemaTemplate
 * @description fills the schema template with the strings from the graphQL services
 * @param {array} graphQLServices - the graphQL services
 * @returns {Promise} of graphQL schema
 */
const fillSchemaTemplate = (
   graphQLServices,
) => {
   const combinedStringsFromGraphQLServices = {
      types: "",
      queries: "",
      mutations: "",
      subscriptions: "",
   };

   graphQLServices.forEach(graphQLService => {
      const graphQLServiceForSchema = Object.assign({}, graphQLService, canAddTypesToSchema);

      graphQLServiceForSchema.addTypesToSchema(combinedStringsFromGraphQLServices);
   });

   const schema = schemaTemplateSkeleton(combinedStringsFromGraphQLServices);

   return Promise.resolve(schema);
};

export {
   fillSchemaTemplate,
   schemaTemplateSkeleton
};