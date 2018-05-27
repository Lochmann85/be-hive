import styled from 'styled-components';

import { Icon } from 'semantic-ui-react';

const FilterHeader = styled.div`
   font-weight: 700;
   margin-bottom: 0.5rem;
`;

const BeHiveIcon = styled(Icon) `
   line-height: 1;
   vertical-align: middle;
   font-size: 1.5em!important;
`;

export {
   FilterHeader,
   BeHiveIcon,
};