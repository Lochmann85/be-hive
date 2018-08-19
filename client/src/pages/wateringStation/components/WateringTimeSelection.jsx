import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { Form, Icon, Table } from 'semantic-ui-react';

import { BeHiveYellowHoverCss, BeHiveButton } from '../../../assets/styles/UI';
import checkForErrorInInput from '../../../helper/validation';

const StyledTable = styled(Table)`
   @media only screen and (min-width: 400px) {
      width:auto!important;
   }
   & th:first-child, td:first-child, th:nth-child(2), td:nth-child(2) {
      width: 40%;
   }
   & th:nth-child(3), td:nth-child(3) {
      text-align:center!important;
   }
`;

const StyledAddHeaderCell = styled(Table.HeaderCell)`
   pointer: cursor!important;
   ${BeHiveYellowHoverCss}
`;

const ContentOffsetWrapper = styled.div`
   margin-bottom: 2.5rem;
`;

const wateringStationFragment = {
   name: "WateringTimeSelection",
   document: gql`
   fragment WateringTimeSelection on WateringStation {
      wateringTimes {
         id
         duration
         time
      }
   }`
};

class WateringTimeSelection extends React.Component {

   static fragments = {
      wateringStation: wateringStationFragment
   }

   static propTypes = {
      onChange: PropTypes.func.isRequired,
      wateringStation: propType(wateringStationFragment.document),
   }

   render() {
      const wateringTimes = this.props.wateringStation.wateringTimes;

      const errors = this.props.errors ? this.props.errors : [];
      const wateringTimesHasError = checkForErrorInInput("wateringTimes", errors);

      let content;
      if (Array.isArray(wateringTimes) && wateringTimes.length > 0) {
         const wateringTimesTableBody = wateringTimes.map((watering, index) =>
            <Table.Row key={index}>
               <Table.Cell content={watering.time} />
               <Table.Cell content={watering.duration} />
               <Table.Cell content="" />
            </Table.Row>
         );

         content = (
            <StyledTable unstackable>
               <Table.Header>
                  <Table.Row >
                     <Table.HeaderCell content="Time" />
                     <Table.HeaderCell content="Duration" />
                     <StyledAddHeaderCell content={<Icon className="ficon-plus" />} />
                  </Table.Row>
               </Table.Header>
               <Table.Body>
                  {wateringTimesTableBody}
               </Table.Body>
            </StyledTable>
         );
      }
      else {
         content = <BeHiveButton content="Add watering time" />;
      }

      return (
         <Form.Field
            error={wateringTimesHasError}>
            <label>Watering times</label>
            <ContentOffsetWrapper>
               {content}
            </ContentOffsetWrapper>
         </Form.Field>
      );
   };
};

export default WateringTimeSelection;