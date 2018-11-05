import React from 'react';

import { Accordion, Icon } from 'semantic-ui-react';

import { FlexWrapper } from '../../assets/styles/Wrapper';

const AccordionItemHeader = ({ index, activeIndex, onClick, children }) => (
   <Accordion.Title
      index={index}
      active={index === activeIndex}
      onClick={onClick}>
      <FlexWrapper>
         {children}
         <Icon name="dropdown" />
      </FlexWrapper>
   </Accordion.Title>
);

export default AccordionItemHeader;