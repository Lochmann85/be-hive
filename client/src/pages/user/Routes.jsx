import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';

import UserOverview from './UserOverview';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import { defaultNumberOfVisibleTableEntries } from '../../components/table/numberOfTableEntries';

const routesPath = "/user";

const viewerFragment = {
   name: "UserRoutesViewer",
   document: gql`
      fragment UserRoutesViewer on Viewer {
         ...${UpdateUser.fragments.viewer.name}
         ...${UserOverview.fragments.viewer.name}
      }
      ${UserOverview.fragments.viewer.document}
      ${UpdateUser.fragments.viewer.document}`
};

class UserRoutes extends React.Component {

   static menuGroup = {
      label: "User",
      mobileIcon: "ficon-users",
      path: routesPath,
      menuItems: [
         UserOverview.menuItem(routesPath),
         CreateUser.menuItem(routesPath),
      ],
   };

   static relatedPaths = {
      userOverview: UserOverview.path(routesPath),
      createUser: CreateUser.path(routesPath),
      updateUser: UpdateUser.path(routesPath),
   };

   static fragments = {
      viewer: viewerFragment,
   }

   static propTypes = {
      viewer: propType(viewerFragment.document)
   }

   constructor(props) {
      super(props);

      this.state = {
         selectedFilterData: [],
         selectedNumberOfTableEntries: defaultNumberOfVisibleTableEntries,
         firstVisibleTableEntryIndex: 0,
         sidebarIsShown: false,
      };
   };

   render() {
      const {
         selectedFilterData,
         selectedNumberOfTableEntries,
         firstVisibleTableEntryIndex,
         sidebarIsShown,
      } = this.state;
      const {
         viewer,
      } = this.props;


      return (
         <Switch>
            <Route exact path={UserOverview.path(routesPath)} render={() => (
               <UserOverview
                  search={selectedFilterData}
                  selectedNumberOfTableEntries={selectedNumberOfTableEntries}
                  firstVisibleTableEntryIndex={firstVisibleTableEntryIndex}
                  onFilterChange={this._handleFilterChange}
                  onTableChange={this._handleTableChange}
                  sidebarIsShown={sidebarIsShown}
                  onToggleSidebar={this._handleToggleSidebar}
                  relatedPaths={UserRoutes.relatedPaths}
                  viewer={viewer} />
            )} />
            <Route exact path={CreateUser.path(routesPath)} render={() => (
               <CreateUser relatedPaths={UserRoutes.relatedPaths} />
            )} />
            <Route exact path={UpdateUser.path(routesPath) + UpdateUser.wildcard} render={(routerProps) => (
               <UpdateUser relatedPaths={UserRoutes.relatedPaths} {...routerProps} viewer={viewer} />
            )} />
         </Switch>
      );
   }

   _handleFilterChange = (filterData, callback) => this.setState({
      selectedFilterData: filterData,
      firstVisibleTableEntryIndex: 0
   }, callback);

   _handleTableChange = (name, value) => this.setState({ [name]: value });

   _handleToggleSidebar = () => this.setState({ sidebarIsShown: !this.state.sidebarIsShown });

};

export default UserRoutes;