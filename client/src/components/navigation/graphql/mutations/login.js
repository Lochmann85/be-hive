import gql from 'graphql-tag';

import checkViewerTemplate from '../../../../checkViewer';

const _updateViewer = (clientStore, viewer, viewerFragment) => {
   const checkViewerDocument = checkViewerTemplate(viewerFragment).document;

   const checkViewerQuery = {
      checkViewer: viewer
   };

   clientStore.writeQuery({
      query: checkViewerDocument, data: checkViewerQuery
   });
};

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
               update: (clientStore, { data: { login } }) => {
                  _updateViewer(clientStore, login, viewerFragment);
               },
            });
         },
      }),
   }
});
