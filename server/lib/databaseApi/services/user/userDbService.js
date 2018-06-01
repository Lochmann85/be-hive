import createUserTemplate from './createUser';
import updateUserTemplate from './updateUser';
import changeUserPasswordTemplate from './changeUserPassword';
import findAllUsersTemplate from './findAllUsers';
import findUserTemplate from './findUser';

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
      changeUserPassword: changeUserPasswordTemplate(models.user, findUser),
   });

   return Object.freeze({
      name: "userDbService",
      services: userDbServices
   });
};

export {
   create,
};