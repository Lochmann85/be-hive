import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';

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
      viewer,
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
            relatedPaths={relatedPaths}
            viewer={viewer} />
      </BaseContentLayoutWithSidebar>
   );
};

const viewerFragment = {
   name: "UserOverviewViewer",
   document: gql`
   fragment UserOverviewViewer on Viewer {
      ...${UserTable.fragments.viewer.name}
   }
   ${UserTable.fragments.viewer.document}`
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
   viewer: propType(viewerFragment.document),
};

UserOverview.fragments = {
   viewer: viewerFragment,
};

UserOverview.path = (routePath) => `${routePath}/view`;

UserOverview.menuItem = (routePath) => ({
   label: "View",
   path: UserOverview.path(routePath)
});

export default UserOverview;