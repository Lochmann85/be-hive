import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BeHiveIcon } from '../../assets/styles/UI';
import { FlexWrapper } from '../../assets/styles/Wrapper';

const VerticalAlignedFlexWrapper = styled(FlexWrapper) `
   align-items: center;
`;

const RemainingSpace = styled.div`
   flex: 1 1 auto;
`;

const DescriptionWithEditAndDelete = (props) => {

   const _onDeleteClick = () => {
      props.onDeleteClick(props.id);
   };

   let deleteIcon,
      editIcon;

   if (props.isSelected) {
      deleteIcon = props.onDeleteClick ?
         <BeHiveIcon className="ficon-cancel" color="red" onClick={_onDeleteClick} link /> : null;

      editIcon = <Link to={`${props.relatedPath}/${props.id}`} >
         <BeHiveIcon className="ficon-edit" color="blue" />
      </Link>;
   }

   return (
      <VerticalAlignedFlexWrapper>
         <RemainingSpace>{props.description}</RemainingSpace>
         {editIcon}
         {deleteIcon}
      </VerticalAlignedFlexWrapper>
   );
};

DescriptionWithEditAndDelete.propTypes = {
   id: PropTypes.string.isRequired,
   relatedPath: PropTypes.string.isRequired,
   isSelected: PropTypes.bool.isRequired,
   onDeleteClick: PropTypes.func,
   description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
   ]),
};

export default DescriptionWithEditAndDelete;
