import findAllUsersTemplate from './findAllUsers';
import findUserTemplate from './findUser';
import loginTemplate from './login';
import checkViewerTemplate from './checkViewer';

const types = `
type User {
   id: ID!
   email: String!
   name: String!
}
type Viewer {
   id: ID!
   name: String!
   token: String!
}
input Credentials {
   email: String
   password: String
}
`;

const queries = `
   checkViewer: Viewer
   findAllUsers: [User!]
   findUser(userId: ID): User!
`;

const queriesResolver = (userDbService) => ({
   checkViewer: checkViewerTemplate(userDbService),
   findAllUsers: findAllUsersTemplate(userDbService),
   findUser: findUserTemplate(userDbService),
});

const mutations = `
   login(credentials: Credentials): Viewer!
`;

const mutationsResolver = (userDbService) => ({
   login: loginTemplate(userDbService),
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

const noAuthRequest = [
   "login",
   "checkViewer",
];

export {
   create,
   noAuthRequest
};