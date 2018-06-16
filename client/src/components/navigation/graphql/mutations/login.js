import gql from 'graphql-tag';

export default (viewerFragment) => ({
   document: gql`
   mutation login($credentials: Credentials) {
      login(credentials: $credentials) {
         ...${viewerFragment.name}
      }
   }
   ${viewerFragment.document}`,
   config: {
      props: ({ mutate }) => ({
         login: (credentials) => {
            return mutate({
               variables: { credentials },
            });
         },
      }),
   }
});
