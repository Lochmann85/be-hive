import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

import { Table } from 'semantic-ui-react';

import BasePagedTable from '../../../components/table/BasePagedTable';
import UserTableRow from './UserTableRow';
import findAllUsersQuery from '../graphql/queries/findAllUsers';
import deleteUserMutationTemplate from '../graphql/mutations/deleteUser';
import DeleteConfirmation from '../../../components/modal/DeleteConfirmation';
import { convertOnlyValidationError } from '../../../components/errorHandling/convertValidationError';

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

class UserTable extends React.Component {

   static propTypes = {
      search: PropTypes.array,
      selectedNumberOfTableEntries: PropTypes.number.isRequired,
      firstVisibleTableEntryIndex: PropTypes.number.isRequired,
      onTableChange: PropTypes.func.isRequired,
      relatedPaths: PropTypes.shape({
         updateUser: PropTypes.string.isRequired,
      }).isRequired,
   };

   static fragments = {
      user: userFragment
   };

   constructor(props) {
      super(props);

      this.state = {
         openDeleteConfirmation: false,
         errors: [],
         selectedUserId: "",
      };
   }

   render() {
      const {
         findAllUsersQuery,
         selectedNumberOfTableEntries,
         firstVisibleTableEntryIndex,
         onTableChange,
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
      const visibleTableRows = visibleUsers.map((user, index) =>
         <UserTableRow
            key={index}
            user={user}
            relatedPaths={this.props.relatedPaths}
            onDeleteClick={this._onDeleteClick} />
      );

      return (
         <Table.Body>
            {visibleTableRows}
         </Table.Body>
      );
   }

   _createTableHeader = () => {
      const headerItems = UserTableRow.header.map((headerItem, index) =>
         <Table.HeaderCell width={headerItem.width} content={headerItem.label} key={index} />
      );

      return (
         <Table.Header>
            <Table.Row>
               {headerItems}
            </Table.Row>
         </Table.Header>
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
               this._onCloseClick();
            }
         })
         .catch(error => convertOnlyValidationError(error, this._onShowError));
   };

   _onShowError = (errors) => this.setState({ errors });
};

const queryDefinition = findAllUsersQuery(userFragment);
const deleteUserMutation = deleteUserMutationTemplate(userFragment);

export default compose(
   graphql(queryDefinition.document, queryDefinition.config),
   graphql(deleteUserMutation.document, deleteUserMutation.config),
)(UserTable);
