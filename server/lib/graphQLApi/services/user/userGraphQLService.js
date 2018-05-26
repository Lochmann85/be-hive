import findAllUsersTemplate from './findAllUsers';

const types = `
type User {
   id: ID!
   firstname: String!
   lastname: String!
   createdAt: String!
   updatedAt: String!
}
`;

const queries = `
   findAllUsers: [User!]
`;

const queriesResolver = (userDbService) => ({
   findAllUsers: findAllUsersTemplate(userDbService)
});

/**
 * @public
 * @function create
 * @description user graphQL service factory
 * @param {object} database - the database wrapper
 * @returns {Promise} of graphQL user service
 */
const create = (
   database,
) => {
   const {
      services: {
         userDbService
      }
   } = database;

   return Object.freeze({
      types,
      queries,
      queriesResolver: queriesResolver(userDbService)
   });
};

export {
   create,
};