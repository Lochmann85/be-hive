import React from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import moment from 'moment';

import { Table } from 'semantic-ui-react';

import DescriptionWithEditAndDelete from '../../../components/table/DescriptionWithEditAndDelete';
import InteractionTableRow from '../../../components/table/InteractionTableRow';
import UserRoutes from '../Routes';

const UserTableRow = (props) => {
   const {
      user,
   } = props;

   const createdAt = new Date(user.createdAt);
   const UserInteractionCell = ({ isSelected }) => (
      <Table.Cell>
         <DescriptionWithEditAndDelete
            routePrefix={UserRoutes.menuGroup.path}
            id={user.id}
            isSelected={isSelected}
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
      createdAt
   }`
};

UserTableRow.propTypes = {
   user: propType(userFragment.document).isRequired
};

UserTableRow.fragments = {
   user: userFragment
};

export default UserTableRow;