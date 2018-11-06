/* eslint no-unused-expressions: 0 */

import 'semantic-ui-css/semantic.min.css';
import '../assets/styles/fontello.css';
import 'rc-time-picker/assets/index.css';

import { injectGlobal } from 'styled-components';

import colors from '../assets/colors';

injectGlobal`
   #root { background: ${colors.white}; };
   .rc-time-picker-panel-clear-btn {display:none!important;};
   .rc-time-picker-panel-select {
      overflow-y: scroll;
      overflow-x: hidden;
   };
`;
