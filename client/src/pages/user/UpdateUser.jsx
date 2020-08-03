import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';

import { Message } from 'semantic-ui-react';

import BaseContentLayout from '../../components/layout/BaseContentLayout';
import UserForm from './components/UserForm';
import findUserQueryTemplate from './graphql/queries/findUser';

const viewerFragment = {
   name: "UpdateUserViewer",
   document: gql`
   fragment UpdateUserViewer on Viewer {
      id
      name
   }`
};

class UpdateUser extends React.Component {

   static path = (routePath) => `${routePath}/update`;
   static wildcard = "/:userId";

   static fragments = {
      viewer: viewerFragment
   }

   static propTypes = {
      relatedPaths: PropTypes.shape({
         userOverview: PropTypes.string.isRequired
      }).isRequired,
      viewer: propType(viewerFragment.document),
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
               errors={this.state.errors} />
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
};

const findUserQuery = findUserQueryTemplate(UserForm.fragments.user);

export default compose(
   graphql(findUserQuery.document, findUserQuery.config),
)(UpdateUser);
