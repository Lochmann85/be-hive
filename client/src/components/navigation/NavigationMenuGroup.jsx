import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Dropdown, Icon } from 'semantic-ui-react';

const MobileDropdown = styled(Dropdown)`
   @media only screen and (min-width: 768px) {
      display: none!important;
   };
`;

const LargerScreensDropdown = styled(Dropdown)`
   @media only screen and (max-width: 767px) {
      display: none!important;
   };
`;

const StyledIcon = styled(Icon)`
   margin: 0px!important;
   font-size: 1.5em!important;
`;

const NavigationMenuGroup = ({ menuGroup }) => {
   let menuGroupItems;

   if (menuGroup.menuItems) {
      menuGroupItems = menuGroup.menuItems.map((menuItem, index) =>
         <Dropdown.Item
            as={Link}
            to={menuItem.path}
            content={menuItem.label}
            key={index} />
      );
   }

   return (
      <React.Fragment>
         <MobileDropdown item icon={<StyledIcon className={menuGroup.mobileIcon} />} simple>
            <Dropdown.Menu>
               {menuGroupItems}
            </Dropdown.Menu>
         </MobileDropdown>
         <LargerScreensDropdown item text={menuGroup.label} simple>
            <Dropdown.Menu>
               {menuGroupItems}
            </Dropdown.Menu>
         </LargerScreensDropdown>
      </React.Fragment>
   );
};

NavigationMenuGroup.propTypes = {
   menuGroup: PropTypes.shape({
      label: PropTypes.string.isRequired,
      mobileIcon: PropTypes.string.isRequired,
      menuItems: PropTypes.arrayOf(PropTypes.shape({
         path: PropTypes.string.isRequired,
         label: PropTypes.string.isRequired
      }).isRequired)
   }).isRequired
};

export default NavigationMenuGroup;