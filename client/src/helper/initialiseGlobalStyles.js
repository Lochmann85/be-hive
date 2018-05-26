import 'semantic-ui-css/semantic.min.css';
import './../assets/styles/fontello.css';

import { injectGlobal } from 'styled-components';

import standardColors from '../assets/colors/standard';

injectGlobal`#root { background: ${standardColors.white}; }`; // eslint-disable-line no-unused-expressions
