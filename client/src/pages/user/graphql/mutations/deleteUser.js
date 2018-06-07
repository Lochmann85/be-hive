import gql from 'graphql-tag';

import findAllUsersQueryTemplate from '../queries/findAllUsers';

const _deleteUserFromAllUsers = (clientStore, deletedUserId, userFragment) => {
   const findAllUsersQueryDocument = findAllUsersQueryTemplate(userFragment).document;

   let findAllUsersQuery;
   try {
      findAllUsersQuery = clientStore.readQuery({ query: findAllUsersQueryDocument });
   } catch (error) { }

   if (findAllUsersQuery) {
      const userIndex = findAllUsersQuery.findAllUsers.findIndex(user => user.id === deletedUserId);

      if (userIndex > -1) {
         findAllUsersQuery.findAllUsers.splice(userIndex, 1);

         clientStore.writeQuery({
            query: findAllUsersQueryDocument, data: findAllUsersQuery
         });
      }
   }
};

export default (userFragment) => ({
   document: gql`
   mutation deleteUser($userId: ID) {
      deleteUser(userId: $userId) {
         ...${userFragment.name}
      }
   }
   ${userFragment.document}`,
   config: {
      props: ({ mutate }) => ({
         deleteUser: (userId) => {
            return mutate({
               variables: { userId },
               update: (clientStore, { data: { deleteUser } }) => {
                  _deleteUserFromAllUsers(clientStore, deleteUser.id, userFragment);
               },
            });
         },
      }),
   }
});
