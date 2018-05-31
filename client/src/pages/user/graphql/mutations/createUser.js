import gql from 'graphql-tag';

export default (userFragment) => ({
   document: gql`
   mutation createUser($userData: UserData) {
      createUser(userData: $userData) {
         ...${userFragment.name}
      }
   }
   ${userFragment.document}`,
   config: {
      props: ({ mutate }) => ({
         createUser: (userData) => {
            return mutate({
               variables: { userData },
               // update: (clientStore, { data: { createUser } }) => {
               //    _updateStore(clientStore, createUser);
               // },
            });
         },
      }),
   }
});
