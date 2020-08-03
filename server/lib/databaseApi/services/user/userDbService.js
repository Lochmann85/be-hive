import { users } from './usersTable';

import createUserTemplate from './createUser';
import updateUserTemplate from './updateUser';
import deleteUserTemplate from './deleteUser';
import changeUserPasswordTemplate from './changeUserPassword';
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
      createUser: createUserTemplate(users),
      updateUser: updateUserTemplate(users),
      deleteUser: deleteUserTemplate(users),
      changeUserPassword: changeUserPasswordTemplate(users, findUser),
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