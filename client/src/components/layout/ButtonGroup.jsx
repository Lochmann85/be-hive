import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFlexWrapper = styled.div`
   display: felx;
   justify-content: flex-end;
   & > .button {
      margin-left: 0.75rem!important;
   };
   & :last-child {
      margin-right: 0!important;
   };
`;

const ButtonGroup = ({ children }) => (
   <StyledFlexWrapper>
      {children}
   </StyledFlexWrapper>
);

ButtonGroup.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
   ]).isRequired
};

export default ButtonGroup;
