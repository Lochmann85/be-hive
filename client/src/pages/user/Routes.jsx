import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserOverview from './UserOverview';
import { defaultNumberOfVisibleTableEntries } from './../../components/table/numberOfTableEntries';

const routesPath = "/user";

class UserRoutes extends React.Component {

   static menuGroup = {
      label: "User",
      path: routesPath,
      menuItems: [
         UserOverview.menuItem,
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

      return (
         <Switch>
            <Route exact path={routesPath + UserOverview.menuItem.path} render={(routerProps) => (
               <UserOverview
                  search={selectedFilterData}
                  selectedNumberOfTableEntries={selectedNumberOfTableEntries}
                  firstVisibleTableEntryIndex={firstVisibleTableEntryIndex}
                  onFilterChange={this._handleFilterChange}
                  onTableChange={this._handleTableChange}
                  sidebarIsShown={sidebarIsShown}
                  onToggleSidebar={this._handleToggleSidebar} />
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