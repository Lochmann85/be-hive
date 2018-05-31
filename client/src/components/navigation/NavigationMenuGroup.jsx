import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Dropdown } from 'semantic-ui-react';

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
      <Dropdown item text={menuGroup.label} simple>
         <Dropdown.Menu>
            {menuGroupItems}
         </Dropdown.Menu>
      </Dropdown>
   );
};

NavigationMenuGroup.propTypes = {
   menuGroup: PropTypes.shape({
      label: PropTypes.string.isRequired,
      menuItems: PropTypes.arrayOf(PropTypes.shape({
         path: PropTypes.string.isRequired,
         label: PropTypes.string.isRequired
      }).isRequired)
   }).isRequired
};

export default NavigationMenuGroup;