import styled, { css } from 'styled-components';

import { Icon, Button, Grid } from 'semantic-ui-react';

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

export {
   FilterHeader,
   BeHiveIcon,
   BeHiveButton,
   NoSideMarginGrid,
   BeHiveYellowHoverCss,
};