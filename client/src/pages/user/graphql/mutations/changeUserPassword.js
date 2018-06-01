import gql from 'graphql-tag';

export default () => ({
   document: gql`
   mutation changeUserPassword($userId: ID, $passwordChangeData: PasswordChangeData) {
      changeUserPassword(userId: $userId, passwordChangeData: $passwordChangeData)
   }`,
   config: {
      props: ({ mutate }) => ({
         changeUserPassword: (userId, passwordChangeData) => {
            return mutate({
               variables: { userId, passwordChangeData },
            });
         },
      }),
   }
});
