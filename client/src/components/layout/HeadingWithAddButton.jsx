import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Icon } from 'semantic-ui-react';

import { BeHiveButton } from '../../assets/styles/UI';

const AddIcon = styled(Icon) `
   margin: 0px!important;
`;

const HeadingWithAddButton = ({ title, linkUrl, showAddButton }) => {
   let AddButton = null;
   if (showAddButton) {
      AddButton = <BeHiveButton as={Link} to={linkUrl} floated="right" >
         <AddIcon className="ficon-plus" />
      </BeHiveButton>;
   }

   return (
      <React.Fragment>
         {title}
         {AddButton}
      </React.Fragment>
   );
};

HeadingWithAddButton.propTypes = {
   title: PropTypes.string.isRequired,
   linkUrl: PropTypes.string,
   showAddButton: PropTypes.bool.isRequired,
};

export default HeadingWithAddButton;