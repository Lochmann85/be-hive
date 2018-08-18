import React from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import styled, { css } from 'styled-components';

import standardColors from '../../../assets/colors/standard.json';

import { Card, Table, Icon, Message } from 'semantic-ui-react';

const StyledCard = styled(Card)`
   ${(props) => {
      if (props.active) {
         return `box-shadow: 0 0 0 1px ${standardColors.lightgrey},
                             1px 3px 2px 0 ${standardColors.be_hive_yellow},
                             0 1px 3px 0 ${standardColors.lightgrey} !important;`;
      }
      else {
         return `opacity: 0.8;!important`;
      }
   }}
`;

const StyledCardHeaderContent = styled(Card.Content)`
   flex-grow: 0!important;
`;

const cardOffsetCss = css`
   padding-left: 0.5rem!important;
   padding-right: 0.5rem!important;
`;

const StyledCardDescription = styled(Card.Description)`
   ${cardOffsetCss}
`;

const CardContentOffset = styled.div`
   ${cardOffsetCss}
`;

const StyledTable = styled(Table)`
   & th:first-child, td:first-child {
      padding-left: 0.785714em!important;
      width: 50%;
   }
`;

const WateringStationPreview = ({ wateringStation }) => {

   let cardContent;
   if (Array.isArray(wateringStation.wateringTimes) && wateringStation.wateringTimes.length > 0) {
      const wateringTimesTableBody = wateringStation.wateringTimes.map((watering, index) =>
         <Table.Row key={index}>
            <Table.Cell content={watering.time} />
            <Table.Cell content={watering.duration} />
         </Table.Row>
      );

      cardContent = (
         <StyledTable unstackable basic="very" celled>
            <Table.Header>
               <Table.Row >
                  <Table.HeaderCell content={<Icon className="ficon-clock" />} />
                  <Table.HeaderCell content={<Icon className="ficon-back-in-time" />} />
               </Table.Row>
            </Table.Header>
            <Table.Body>
               {wateringTimesTableBody}
            </Table.Body>
         </StyledTable>
      );
   }
   else {
      cardContent = <Message visible content="No watering times found" />;
   }

   return (
      <StyledCard link active={wateringStation.isActive ? 1 : 0}>
         <StyledCardHeaderContent>
            <Card.Header content={wateringStation.name} />
            <StyledCardDescription content={wateringStation.description} />
         </StyledCardHeaderContent>
         <Card.Content>
            <CardContentOffset>
               {cardContent}
            </CardContentOffset>
         </Card.Content>
      </StyledCard>
   );
};

const wateringStationFragment = {
   name: "WateringStationPreview",
   document: gql`
   fragment WateringStationPreview on WateringStation {
      id
      name
      description
      isActive
      wateringTimes {
         id
         duration
         time
      }
   }`
};

WateringStationPreview.propTypes = {
   wateringStation: propType(wateringStationFragment.document)
};

WateringStationPreview.fragments = {
   wateringStation: wateringStationFragment,
};

export default WateringStationPreview;