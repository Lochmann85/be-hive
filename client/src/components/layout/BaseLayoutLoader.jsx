import React from 'react';

import { Grid, Loader } from 'semantic-ui-react';

export default () => (
   <Grid >
      <Grid.Row>
         <Grid.Column>
            <Loader active inline="centered" />
         </Grid.Column>
      </Grid.Row>
   </Grid>
);