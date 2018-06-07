import gql from 'graphql-tag';

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
            });
         },
      }),
   }
});
