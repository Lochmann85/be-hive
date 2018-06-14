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
 * @param {object} models - the database models
 * @returns {Promise} of database user service
 */
const create = (
   models,
) => {
   const findUser = findUserTemplate(models.user);

   const userDbServices = Object.freeze({
      findAllUsers: findAllUsersTemplate(models.user),
      findUser,
      createUser: createUserTemplate(models.user),
      updateUser: updateUserTemplate(models.user),
      deleteUser: deleteUserTemplate(models.user),
      changeUserPassword: changeUserPasswordTemplate(models.user, findUser),
      authenticateUser: authenticateUserTemplate(models.user),
   });

   return Object.freeze({
      name: "userDbService",
      services: userDbServices
   });
};

export {
   create,
};