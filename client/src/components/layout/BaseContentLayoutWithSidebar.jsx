import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BaseContentLayout from './BaseContentLayout';
import { FlexWrapper } from '../../assets/styles/Wrapper';

const TopAlignedFlexWrapper = styled(FlexWrapper)`
   align-items: stretch;
   @media only screen and (max-width: 991px) {
      flex-direction: column;
   };
`;

const RemainingSpace = styled.div`
   flex: 1 1 auto;
`;

const FilterWrapper = styled.div`
   margin-right: 2rem;
   padding-right: 1rem;
   border-right: 1px solid rgba(0,0,0,.1);
   align-self: stretch;
   &.filterFixedSize {
      flex: 0 0 400px;
   };
   @media only screen and (max-width: 991px) {
      display: none;
   };
`;

const TabletFilterWrapper = styled.div`
   align-self: stretch;
   @media only screen and (min-width: 992px) {
      display: none;
   };
`;

const BaseContentLayoutWithSidebar = (props) => {

   let sidebarContent = props.collapsedSidebarContent,
      toggleClass = "";

   if (props.sidebarIsShown) {
      sidebarContent = props.shownSidebarContent;
      toggleClass = "filterFixedSize";
   }

   return (
      <BaseContentLayout title={props.title}>
         <TopAlignedFlexWrapper>
            <FilterWrapper className={toggleClass}>
               {sidebarContent}
            </FilterWrapper>
            <TabletFilterWrapper>
               {props.shownSidebarContent}
            </TabletFilterWrapper>
            <RemainingSpace>
               {props.children}
            </RemainingSpace>
         </TopAlignedFlexWrapper>
      </BaseContentLayout>
   );
};

BaseContentLayoutWithSidebar.propTypes = {
   ...BaseContentLayout.propTypes,
   sidebarIsShown: PropTypes.bool.isRequired,
   collapsedSidebarContent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
   ]).isRequired,
   shownSidebarContent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
   ]).isRequired
};

export default BaseContentLayoutWithSidebar;