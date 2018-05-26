/**
 * @module service
 * starts up the app, entry point
 */

import { startup } from './startupApp';

startup()
   .catch(error => console.log(`FATAL ERROR: ${error}`));