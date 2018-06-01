import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';

import BaseContentLayoutWithSidebar from '../../components/layout/BaseContentLayoutWithSidebar';
import UserTable from './components/UserTable';
import MainUserFilter from './components/MainUserFilter';
import HeadingWithAddButton from '../../components/layout/HeadingWithAddButton';

const UserOverview = (props) => {
   const {
      search,
      selectedNumberOfTableEntries,
      firstVisibleTableEntryIndex,
      onFilterChange,
      onTableChange,
      sidebarIsShown,
      onToggleSidebar,
      relatedPaths,
   } = props;

   return (
      <BaseContentLayoutWithSidebar
         sidebarIsShown={sidebarIsShown}
         title={
            <HeadingWithAddButton
               title="Table of all users"
               linkUrl={relatedPaths.createUser}
               showAddButton={true} />
         }
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
            onTableChange={onTableChange}
            relatedPaths={relatedPaths} />
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
   relatedPaths: PropTypes.shape({
      createUser: PropTypes.string.isRequired,
      updateUser: PropTypes.string.isRequired,
   }).isRequired,
};

UserOverview.path = (routePath) => `${routePath}/view`;

UserOverview.menuItem = (routePath) => ({
   label: "View",
   path: UserOverview.path(routePath)
});


export default UserOverview;