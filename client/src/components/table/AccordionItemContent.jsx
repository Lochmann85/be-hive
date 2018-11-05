import React from 'react';
import styled from 'styled-components';

import { Accordion } from 'semantic-ui-react';

import { ButtonGroupWrapper } from '../../assets/styles/Wrapper';

const StyledAccordionContent = styled(Accordion.Content)`
   padding-top: 0!important;
`;

const StyledButtonGroup = styled(ButtonGroupWrapper)`
   *:first-child {
      margin-left: 1rem!important;
   }
`;

const AccordionItemHeader = ({ index, activeIndex, interactionButtons, children }) => (
   <StyledAccordionContent active={index === activeIndex}>
      {children}
      <StyledButtonGroup>
         {interactionButtons}
      </StyledButtonGroup>
   </StyledAccordionContent>
);

export default AccordionItemHeader;