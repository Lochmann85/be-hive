import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';
import styled, { css } from 'styled-components';

import { Form, Table, Message, Accordion } from 'semantic-ui-react';

import checkForErrorInInput from '../../../helper/validation';
import { FlexWrapper } from '../../../assets/styles/Wrapper';

const StyledTable = styled(Table)`
   @media only screen and (min-width: 400px) {
      width:350px!important;
   }
`;

const StyledTableCell = styled(Table.Cell)`
   padding: 0!important;
`;

const cellPadding = css`padding: .78571429em`;

const TimeCell = styled.div`
   ${cellPadding};
   width: 50%;
   text-align: left;
`;

const DurationCell = styled.div`
   ${cellPadding};
   text-align: left;
   flex: 1 1 auto;
`;

const ContentOffsetWrapper = styled.div`
   margin-bottom: 2rem;
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

   constructor(props) {
      super(props);

      this.state = {
         openAddWatering: false,
         selectedWatering: null,
         activeIndex: -1,
      };
   }

   render() {
      const {
         activeIndex
      } = this.state;

      const wateringTimes = this.props.wateringStation.wateringTimes;

      const errors = this.props.errors ? this.props.errors : [];
      const durationHasError = checkForErrorInInput("duration", errors);
      const timeHasError = checkForErrorInInput("time", errors);
      const wateringTimesHasError = durationHasError || timeHasError;

      let content;
      if (Array.isArray(wateringTimes) && wateringTimes.length > 0) {

         const wateringTimesTableBody = wateringTimes.map((watering, index) =>
            <Accordion.Title
               index={index}
               active={index === activeIndex}
               key={index}>
               <FlexWrapper>
                  <TimeCell>{watering.time}</TimeCell>
                  <DurationCell>{watering.duration}</DurationCell>
               </FlexWrapper>
            </Accordion.Title>
         );

         content = (
            <StyledTable unstackable>
               <Table.Header>
                  <Table.Row>
                     <Table.HeaderCell content="Time" width={8} />
                     <Table.HeaderCell content="Duration" />
                  </Table.Row>
               </Table.Header>
               <Table.Body>
                  <Table.Row>
                     <StyledTableCell colSpan={2}>
                        {wateringTimesTableBody}
                     </StyledTableCell>
                  </Table.Row>
               </Table.Body>
            </StyledTable>
         );
      }
      else {
         content = <Message content="Did not find a watering time" />;
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