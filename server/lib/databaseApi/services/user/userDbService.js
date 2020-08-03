import { users } from './usersTable';

import findAllUsersTemplate from './findAllUsers';
import findUserTemplate from './findUser';
import authenticateUserTemplate from './authenticateUser';

/**
 * @public
 * @function create
 * @description user db service factory
 * @returns {Promise} of database user service
 */
const create = () => {
   const findUser = findUserTemplate(users);

   const userDbServices = Object.freeze({
      findAllUsers: findAllUsersTemplate(users),
      findUser,
      authenticateUser: authenticateUserTemplate(users),
   });

   return Object.freeze({
      name: "userDbService",
      services: userDbServices
   });
};

export {
   create,
};