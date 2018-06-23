import gql from 'graphql-tag';

export default (viewerFragment) => ({
   document: gql`
   query checkViewerQuery {
      checkViewer {
         ...${viewerFragment.name}
      }
   }
   ${viewerFragment.document}`,
   config: {
      name: "checkViewerQuery",
   }
});