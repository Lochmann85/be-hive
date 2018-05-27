import gql from 'graphql-tag';

export default (userFragments) => ({
   document: gql`
   query findAllUsersQuery {
      findAllUsers {
         ...${userFragments.name}
      }
   }
   ${userFragments.document}`,
   config: {
      name: "findAllUsersQuery",
      options: {
         fetchPolicy: "network-only"
      }
   }
});