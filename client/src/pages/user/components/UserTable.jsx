import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

import { Table } from 'semantic-ui-react';

import BasePagedTable from '../../../components/table/BasePagedTable';
import UserTableRow from './UserTableRow';
import findAllUsersQuery from '../graphql/queries/findAllUsers';

const UserTable = (props) => {
   const {
      findAllUsersQuery,
      selectedNumberOfTableEntries,
      firstVisibleTableEntryIndex,
      onTableChange,
      relatedPaths,
   } = props;

   const _createTableBody = (visibleUsers) => {
      const visibleTableRows = visibleUsers.map((user, index) =>
         <UserTableRow
            key={index}
            user={user}
            relatedPaths={relatedPaths} />
      );

      return (
         <Table.Body>
            {visibleTableRows}
         </Table.Body>
      );
   };

   const _createTableHeader = () => {
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
   };

   let users = [];
   if (findAllUsersQuery && findAllUsersQuery.findAllUsers) {
      users = findAllUsersQuery.findAllUsers;
   }

   return (
      <BasePagedTable
         tableEntries={users}
         noEntriesFoundComment={"No users were found."}
         createTableBody={_createTableBody}
         createTableHeader={_createTableHeader}
         selectedNumberOfTableEntries={selectedNumberOfTableEntries}
         firstVisibleTableEntryIndex={firstVisibleTableEntryIndex}
         onTableChange={onTableChange}
         query={props.findAllUsersQuery}
         numberOfColumns={UserTableRow.header.length}
      />
   );
};

const userFragment = {
   name: "UserTable",
   document: gql`
   fragment UserTable on User {
      ...${UserTableRow.fragments.user.name}
   }
   ${UserTableRow.fragments.user.document}`
};

UserTable.propTypes = {
   search: PropTypes.array,
   selectedNumberOfTableEntries: PropTypes.number.isRequired,
   firstVisibleTableEntryIndex: PropTypes.number.isRequired,
   onTableChange: PropTypes.func.isRequired,
   relatedPaths: PropTypes.shape({
      updateUser: PropTypes.string.isRequired,
   }).isRequired,
};

UserTable.fragments = {
   user: userFragment
};

const queryDefinition = findAllUsersQuery(userFragment);

export default compose(
   graphql(queryDefinition.document, queryDefinition.config),
)(UserTable);
