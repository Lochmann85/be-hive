import gql from 'graphql-tag';

export default (userFragment) => ({
   document: gql`
   query findUserQuery($userId: ID!) {
      findUser(userId: $userId) {
         ...${userFragment.name}
      }
   }
   ${userFragment.document}`,
   config: {
      name: "findUserQuery",
      options: (ownProps) => {
         return {
            variables: { userId: ownProps.match.params.userId }
         };
      }
   }
});