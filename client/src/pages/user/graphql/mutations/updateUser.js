import gql from 'graphql-tag';

export default (userFragment) => ({
   document: gql`
   mutation updateUser($userId: ID, $userData: UserData) {
      updateUser(userId: $userId, userData: $userData) {
         ...${userFragment.name}
      }
   }
   ${userFragment.document}`,
   config: {
      props: ({ mutate }) => ({
         updateUser: (userId, userData) => {
            return mutate({
               variables: { userId, userData },
               update: (clientStore, { data: { updateUser } }) => {
                  // _updateViewer(clientStore, updateUser, viewerId);
               },
            });
         },
      }),
   }
});
