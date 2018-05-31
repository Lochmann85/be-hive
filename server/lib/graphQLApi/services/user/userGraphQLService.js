import findAllUsersTemplate from './findAllUsers';
import findUserTemplate from './findUser';
import createUserTemplate from './createUser';
import updateUserTemplate from './updateUser';

const types = `
type User {
   id: ID!
   email: String!
   name: String!
   createdAt: String!
   updatedAt: String!
}
input UserData {
   email: String
   name: String
   password: String
}
`;

const queries = `
   findAllUsers: [User!]
   findUser(userId: ID): User!
`;

const queriesResolver = (userDbService) => ({
   findAllUsers: findAllUsersTemplate(userDbService),
   findUser: findUserTemplate(userDbService),
});

const mutations = `
   createUser(userData: UserData): User!
   updateUser(userId: ID!, userData:  UserData): User!
`;

const mutationsResolver = (userDbService) => ({
   createUser: createUserTemplate(userDbService),
   updateUser: updateUserTemplate(userDbService),
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
      queriesResolver: queriesResolver(userDbService),
      mutations,
      mutationsResolver: mutationsResolver(userDbService),
   });
};

export {
   create,
};