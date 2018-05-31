import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import BaseContentLayout from '../../components/layout/BaseContentLayout';
import browserHistory from '../../storeHandler/routerHistory';
import createUserMutationTemplate from './graphql/mutations/createUser';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

class CreateUser extends React.Component {

   static path = (routePath) => `${routePath}/create`;

   static menuItem = (routePath) => ({
      label: "Create",
      path: CreateUser.path(routePath)
   });

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

      return (
         <BaseContentLayout title={"Create a new user"}>
            <UserForm
               onSubmit={this._onSubmit}
               errors={this.state.errors}
               submitButtonTitle="Create" />
         </BaseContentLayout>
      );
   }

   _onSubmit = (userData) => {
      const {
         createUser,
         relatedPaths,
      } = this.props;

      createUser(userData).then(response => {
         if (response.data.createUser) {
            browserHistory.push(relatedPaths.userOverview);
         }
      }).catch(error => { console.log(error); });
   };

   _onShowError = (errors) => this.setState({ errors });
};

const userFragment = {
   name: "CreateUser",
   document: gql`
   fragment CreateUser on User {
      ...${UserTable.fragments.user.name}
   }
   ${UserTable.fragments.user.document}`
};

const createUserMutation = createUserMutationTemplate(userFragment);

export default graphql(
   createUserMutation.document, createUserMutation.config
)(CreateUser);