import styled, { css } from 'styled-components';

import { Icon, Button, Grid, Accordion } from 'semantic-ui-react';

import standardColors from '../colors/standard.json';

const FilterHeader = styled.div`
   font-weight: 700;
   margin-bottom: 0.5rem;
`;

const BeHiveIcon = styled(Icon)`
   line-height: 1;
   vertical-align: middle;
   font-size: 1.5em!important;
`;

const BeHiveYellowHoverCss = css`
   background: ${standardColors.be_hive_yellow}!important;
   color: ${standardColors.black}!important;
   opacity: 0.7!important;
   &:hover {
      opacity: 1!important;
   }
`;

const BeHiveButton = styled(Button)`
   ${BeHiveYellowHoverCss}
`;

const NoSideMarginGrid = styled(Grid)`
   margin-left: 0!important;
   margin-right: 0!important;
`;

const TableAccordion = styled(Accordion)`
   & > div > div.title {
      border-top:1px solid rgba(34,36,38,.1);
   };
   & > div:first-child > div.title {
      border-top: none;
   };
   & > div > div.content {
      padding-bottom: 1rem!important;
   };
`;

export {
   FilterHeader,
   BeHiveIcon,
   BeHiveButton,
   NoSideMarginGrid,
   BeHiveYellowHoverCss,
   TableAccordion,
};