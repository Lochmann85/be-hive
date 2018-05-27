import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';

import BaseContentLayoutWithSidebar from './../../components/layout/BaseContentLayoutWithSidebar';
import UserTable from './components/UserTable';
import MainUserFilter from './components/MainUserFilter';

const UserOverview = (props) => {
   const {
      search,
      selectedNumberOfTableEntries,
      firstVisibleTableEntryIndex,
      onFilterChange,
      onTableChange,
      sidebarIsShown,
      onToggleSidebar
   } = props;

   return (
      <BaseContentLayoutWithSidebar
         sidebarIsShown={sidebarIsShown}
         title={"Table of all users"}
         collapsedSidebarContent={<Button icon="search" onClick={onToggleSidebar} />}
         shownSidebarContent={<MainUserFilter
            search={search}
            onFilterChange={onFilterChange}
            onHideFilter={onToggleSidebar} />
         }>
         <UserTable
            search={search}
            selectedNumberOfTableEntries={selectedNumberOfTableEntries}
            firstVisibleTableEntryIndex={firstVisibleTableEntryIndex}
            onTableChange={onTableChange} />
      </BaseContentLayoutWithSidebar>
   );
};

UserOverview.propTypes = {
   search: PropTypes.array,
   selectedNumberOfTableEntries: PropTypes.number.isRequired,
   firstVisibleTableEntryIndex: PropTypes.number.isRequired,
   onFilterChange: PropTypes.func.isRequired,
   onTableChange: PropTypes.func.isRequired,
   sidebarIsShown: PropTypes.bool.isRequired,
   onToggleSidebar: PropTypes.func.isRequired,
};

UserOverview.menuItem = {
   label: "View",
   path: "/view"
};

export default UserOverview;