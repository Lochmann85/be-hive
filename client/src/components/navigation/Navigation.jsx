import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Icon, Menu } from 'semantic-ui-react';

import ControlCenterMenu from '../controlCenter/ControlCenterMenu';
import NavigationMenuGroup from './NavigationMenuGroup';
import PrivateRoutes from '../../pages/PrivateRoutes';

const HomeIcon = styled(Icon) `
   margin: 0!important;
`;

const Navigation = () => {
   const navigationMenuGroups = PrivateRoutes.navigation.map((menuGroup, index) =>
      <NavigationMenuGroup menuGroup={menuGroup} key={index} />
   );

   return (
      <Menu>
         <Menu.Item header as={Link} to={"/"}>
            <HomeIcon className="ficon-home" size="big" />
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