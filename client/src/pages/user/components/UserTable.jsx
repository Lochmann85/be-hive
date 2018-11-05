import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import { Table } from 'semantic-ui-react';

import BasePagedTable from '../../../components/table/BasePagedTable';
import BaseLayoutLoader from '../../../components/layout/BaseLayoutLoader';
import UserTableRow from './UserTableRow';
import findAllUsersQuery from '../graphql/queries/findAllUsers';
import deleteUserMutationTemplate from '../graphql/mutations/deleteUser';
import DeleteConfirmation from '../../../components/modal/DeleteConfirmation';
import { convertOnlyValidationError } from '../../../components/errorHandling/convertValidationError';

const StyledTableHeader = styled(Table.Header)`
   @media only screen and (max-width: 991px) {   
      tr th:nth-child(2) {
         display: none!important;
      }
      tr th:nth-child(3) {
         display: none!important;
      }
   }; 
`;

const userFragment = {
   name: "UserTable",
   document: gql`
   fragment UserTable on User {
      name
      id
      ...${UserTableRow.fragments.user.name}
   }
   ${UserTableRow.fragments.user.document}`
};

const viewerFragment = {
   name: "UserTableViewer",
   document: gql`
   fragment UserTableViewer on Viewer {
      ...${UserTableRow.fragments.viewer.name}
   }
   ${UserTableRow.fragments.viewer.document}`
};

class UserTable extends React.Component {

   static propTypes = {
      search: PropTypes.array,
      selectedNumberOfTableEntries: PropTypes.number.isRequired,
      firstVisibleTableEntryIndex: PropTypes.number.isRequired,
      onTableChange: PropTypes.func.isRequired,
      relatedPaths: PropTypes.shape({
         updateUser: PropTypes.string.isRequired,
      }).isRequired,
      viewer: propType(viewerFragment.document),
   };

   static fragments = {
      user: userFragment,
      viewer: viewerFragment,
   };

   constructor(props) {
      super(props);

      this.state = {
         openDeleteConfirmation: false,
         errors: [],
         selectedUserId: "",
         activeIndex: -1,
      };
   }

   render() {
      const {
         findAllUsersQuery,
         selectedNumberOfTableEntries,
         firstVisibleTableEntryIndex,
         onTableChange,
         viewer,
      } = this.props;

      let users = [],
         deleteMessage = "";
      if (findAllUsersQuery && findAllUsersQuery.findAllUsers) {
         users = findAllUsersQuery.findAllUsers;

         const selectedUser = users.find(user => user.id === this.state.selectedUserId);
         if (selectedUser) {
            deleteMessage = `The user with name "${selectedUser.name}" will be deleted.`;
         }
      }

      if (!viewer) {
         return <BaseLayoutLoader />;
      }

      return (
         <React.Fragment>
            <BasePagedTable
               tableEntries={users}
               noEntriesFoundComment={"No users were found."}
               createTableBody={this._createTableBody}
               createTableHeader={this._createTableHeader}
               selectedNumberOfTableEntries={selectedNumberOfTableEntries}
               firstVisibleTableEntryIndex={firstVisibleTableEntryIndex}
               onTableChange={onTableChange}
               query={this.props.findAllUsersQuery}
               numberOfColumns={UserTableRow.header.length}
            />
            <DeleteConfirmation
               open={this.state.openDeleteConfirmation}
               description={deleteMessage}
               errors={this.state.errors}
               onDeleteConfirmation={this._onDeleteConfirmation}
               onCloseClick={this._onCloseClick} />
         </React.Fragment>
      );
   }

   _createTableBody = (visibleUsers) => {
      const {
         activeIndex
      } = this.state;

      const visibleTableRows = visibleUsers.map((user, index) =>
         <UserTableRow
            key={index}
            user={user}
            relatedPaths={this.props.relatedPaths}
            onDeleteClick={this._onDeleteClick}
            index={index}
            activeIndex={activeIndex}
            onRowClick={this._setSelectedRow}
            viewer={this.props.viewer} />
      );

      return visibleTableRows;
   }

   _createTableHeader = () => {
      const headerItems = UserTableRow.header.map((headerItem, index) =>
         <Table.HeaderCell width={headerItem.width} content={headerItem.label} key={index} />
      );

      return (
         <StyledTableHeader>
            <Table.Row>
               {headerItems}
            </Table.Row>
         </StyledTableHeader>
      );
   }

   _onDeleteClick = (userId) => this.setState({
      openDeleteConfirmation: true,
      selectedUserId: userId,
   });

   _onCloseClick = () => this.setState({
      openDeleteConfirmation: false,
      errors: [],
      selectedUserId: "",
   });

   _onDeleteConfirmation = () => {
      this.props.deleteUser(this.state.selectedUserId)
         .then(response => {
            if (response.data.deleteUser) {
               this._handleAfterDelete();
            }
         })
         .catch(error => convertOnlyValidationError(error, this._onShowError));
   };

   _onShowError = (errors) => this.setState({ errors });

   _setSelectedRow = (event, row) => {
      const { index } = row;
      const { activeIndex } = this.state;

      if (index === activeIndex) {
         this.setState({ activeIndex: -1 });
      }
      else {
         this.setState({ activeIndex: index });
      }
   };

   _handleAfterDelete = () => this.setState({
      activeIndex: -1,
      openDeleteConfirmation: false,
      errors: [],
      selectedUserId: "",
   });
};

const queryDefinition = findAllUsersQuery(userFragment);
const deleteUserMutation = deleteUserMutationTemplate(userFragment);

export default compose(
   graphql(queryDefinition.document, queryDefinition.config),
   graphql(deleteUserMutation.document, deleteUserMutation.config),
)(UserTable);
