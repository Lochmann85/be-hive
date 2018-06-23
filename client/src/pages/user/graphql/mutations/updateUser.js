import gql from 'graphql-tag';

import checkViewerTemplate from '../../../../checkViewer';

const _updateViewer = (clientStore, updatedUser, viewer, viewerFragment) => {
   if (updatedUser.id === viewer.id && updatedUser.name !== viewer.name) {
      const checkViewerDocument = checkViewerTemplate(viewerFragment).document;

      const updatedViewer = Object.assign({}, viewer, { name: updatedUser.name });
      const checkViewerQuery = {
         checkViewer: updatedViewer
      };

      clientStore.writeQuery({
         query: checkViewerDocument, data: checkViewerQuery
      });
   }
};

export default (userFragment, viewerFragment) => ({
   document: gql`
   mutation updateUser($userId: ID, $userData: UserData) {
      updateUser(userId: $userId, userData: $userData) {
         ...${userFragment.name}
      }
   }
   ${userFragment.document}`,
   config: {
      props: ({ mutate, ownProps }) => ({
         updateUser: (userId, userData) => {
            return mutate({
               variables: { userId, userData },
               update: (clientStore, { data: { updateUser } }) => {
                  const { viewer } = ownProps;

                  _updateViewer(clientStore, updateUser, viewer, viewerFragment);
               },
            });
         },
      }),
   }
});
