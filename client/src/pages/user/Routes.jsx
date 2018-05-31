import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserOverview from './UserOverview';
import CreateUser from './CreateUser';
import { defaultNumberOfVisibleTableEntries } from '../../components/table/numberOfTableEntries';

const routesPath = "/user";

class UserRoutes extends React.Component {

   static menuGroup = {
      label: "User",
      path: routesPath,
      menuItems: [
         UserOverview.menuItem(routesPath),
         CreateUser.menuItem(routesPath),
      ],
   };

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

      const relatedPaths = {
         userOverview: UserOverview.path(routesPath),
         createUser: CreateUser.path(routesPath),
      };

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
                  relatedPaths={relatedPaths} />
            )} />
            <Route exact path={CreateUser.path(routesPath)} render={() => (
               <CreateUser relatedPaths={relatedPaths} />
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