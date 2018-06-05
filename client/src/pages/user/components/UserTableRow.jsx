import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import moment from 'moment';

import { Table } from 'semantic-ui-react';

import DescriptionWithEditAndDelete from '../../../components/table/DescriptionWithEditAndDelete';
import InteractionTableRow from '../../../components/table/InteractionTableRow';

const UserTableRow = (props) => {
   const {
      user,
      relatedPaths,
      onDeleteClick,
   } = props;

   const createdAt = new Date(user.createdAt);
   const UserInteractionCell = ({ isSelected }) => (
      <Table.Cell>
         <DescriptionWithEditAndDelete
            relatedPath={relatedPaths.updateUser}
            id={user.id}
            isSelected={isSelected}
            onDeleteClick={onDeleteClick}
            description={moment(createdAt).format("DD.MM.YYYY - HH:mm")} />
      </Table.Cell>
   );
   UserInteractionCell.hasSelectionState = true;

   return (
      <InteractionTableRow>
         <Table.Cell content={user.email} />
         <Table.Cell content={user.name} />
         <UserInteractionCell />
      </InteractionTableRow>
   );
};

UserTableRow.header = [
   { width: 6, label: "E-Mail" },
   { width: 5, label: "Name" },
   { width: 5, label: "Created at" }
];

const userFragment = {
   name: "UserTableRow",
   document: gql`
   fragment UserTableRow on User {
      id
      email
      name
      isDeletable
      createdAt
   }`
};

UserTableRow.propTypes = {
   onDeleteClick: PropTypes.func.isRequired,
   user: propType(userFragment.document).isRequired,
   relatedPaths: PropTypes.shape({
      updateUser: PropTypes.string.isRequired,
   }).isRequired,
};

UserTableRow.fragments = {
   user: userFragment
};

export default UserTableRow;