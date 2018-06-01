import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import { Message } from 'semantic-ui-react';

import BaseContentLayout from './../../components/layout/BaseContentLayout';
import UserForm from './components/UserForm';
import browserHistory from './../../storeHandler/routerHistory';
import updateUserMutationTemplate from './graphql/mutations/updateUser';
import findUserQueryTemplate from './graphql/queries/findUser';
import UserTable from './components/UserTable';

class UpdateUser extends React.Component {

   static path = (routePath) => `${routePath}/update`;
   static wildcard = "/:userId";

   static propTypes = {
      relatedPaths: PropTypes.shape({
         userOverview: PropTypes.string.isRequired
      }).isRequired
   }

   constructor(props) {
      super(props);

      this.state = {
         errors: []
      };
   }

   render() {
      const { findUserQuery: { findUser } } = this.props;

      let updateUserContent,
         title;

      if (findUser) {
         title = `Update user: ${findUser.name}`;

         updateUserContent = (
            <UserForm
               user={findUser}
               onSubmit={this._onSubmit}
               errors={this.state.errors}
               submitButtonTitle="Update" />
         );
      }
      else {
         title = "";
         updateUserContent = <Message message="User could not be found." />;
      }

      return (
         <BaseContentLayout title={title}>
            {updateUserContent}
         </BaseContentLayout>
      );
   }

   _onSubmit = (userData) => {
      const {
         updateUser,
         findUserQuery,
         relatedPaths,
      } = this.props;

      updateUser(findUserQuery.findUser.id, userData)
         .then(response => {
            if (response.data.updateUser) {
               browserHistory.push(relatedPaths.userOverview);
            }
         })
         .catch(error => console.log(error));
   };

   _onShowError = (errors) => this.setState({ errors });
};

const findUserQuery = findUserQueryTemplate(UserForm.fragments.user);
const updateUserMutation = updateUserMutationTemplate(UserTable.fragments.user);

export default compose(
   graphql(findUserQuery.document, findUserQuery.config),
   graphql(updateUserMutation.document, updateUserMutation.config),
)(UpdateUser);
