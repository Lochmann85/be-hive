import React from 'react';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Menu, Image } from 'semantic-ui-react';

import logo from '../../assets/images/be-hive-logo.svg';
import standardColors from '../../assets/colors/standard.json';

import ControlCenterMenu from '../controlCenter/ControlCenterMenu';
import NavigationMenuGroup from './NavigationMenuGroup';
import PrivateRoutes from '../../pages/PrivateRoutes';

import browserHistory from '../../storeHandler/routerHistory';

const HeaderText = styled.span`
   margin-left:0.7rem;
   font-size:1.5rem;
   color:${standardColors.be_hive_logo_grey};
   vertical-align:middle;
   @media only screen and (max-width: 767px) {
      display: none;
   };
`;

const MobileHeaderText = styled.span`
   margin-left:0.7rem;
   font-size:1.5rem;
   color:${standardColors.be_hive_logo_grey};
   vertical-align:middle;
   @media only screen and (min-width: 768px) {
      display: none;
   };
`;

const LogoImage = styled(Image)`
   @media only screen and (max-width: 767px) {
      height:32px;
      width:32px;
   };
   display:inline-block!important;
`;

class Navigation extends React.Component {

   render() {
      const navigationMenuGroups = PrivateRoutes.navigation.map((menuGroup, index) =>
         <NavigationMenuGroup menuGroup={menuGroup} key={index} />
      );

      return (
         <Menu>
            <Menu.Item header>
               <Link to="/">
                  <LogoImage src={logo} />
                  <HeaderText>Be-Hive</HeaderText>
                  <MobileHeaderText>B-H</MobileHeaderText>
               </Link>
            </Menu.Item>
            <Menu.Menu>
               {navigationMenuGroups}
            </Menu.Menu>
            <Menu.Menu position="right">
               <ControlCenterMenu
                  onLoginSuccess={this._handleLoginSuccess}
                  onLogout={this._handleLogout} />
            </Menu.Menu>
         </Menu>
      );
   }

   _handleLoginSuccess = (token) => {
      localStorage.setItem("jwtToken", token);
   }

   _handleLogout = () => {
      localStorage.removeItem("jwtToken");
      this.props.client.cache.reset()
         .then(() => {
            browserHistory.push("/");
         });
   }
};

export default withApollo(Navigation);