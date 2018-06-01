import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Menu, Image } from 'semantic-ui-react';

import ControlCenterMenu from '../controlCenter/ControlCenterMenu';
import NavigationMenuGroup from './NavigationMenuGroup';
import PrivateRoutes from '../../pages/PrivateRoutes';
import logo from '../../assets/images/be-hive-logo.svg';
import standardColors from '../../assets/colors/standard.json';

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

const LogoImage = styled(Image) `
   @media only screen and (max-width: 767px) {
      height:32px;
      width:32px;
   };
   display:inline-block!important;
`;

const Navigation = () => {
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
            <ControlCenterMenu />
         </Menu.Menu>
      </Menu>
   );
};

export default Navigation;