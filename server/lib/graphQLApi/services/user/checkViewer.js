/**
 * @public
 * @function checkViewer
 * @description checkViewer of the app
 * @returns {Promise} of viewer
 */
const checkViewer = () => (_, args, { viewer, tokenHandler }) => {
   if (viewer) {
      return tokenHandler.encrypt(viewer)
         .then(token => {
            viewer.token = token;
            return viewer;
         });
   }
   return null;
};

export default checkViewer;