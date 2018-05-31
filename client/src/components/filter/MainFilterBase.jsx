import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Dropdown, Icon } from 'semantic-ui-react';

import {
   FilterHeader,
   BeHiveButton,
} from '../../assets/styles/UI';
import { FlexWrapper } from '../../assets/styles/Wrapper';

const FilterSelectionWrapper = styled.div`
   & > div {
      margin-top: 1rem;
   };
`;

const ResetLink = styled.a`
   margin-left: 2rem;
   margin-bottom: 1rem;
   cursor: pointer;
`;

const HideIcon = styled(Icon) `
   cursor: pointer;
   margin-bottom: 0.6rem!important;
`;
const StyledFilterHeader = styled(FilterHeader) `
   cursor: pointer;
`;

const SearchTypeSelection = styled(Dropdown) `
   flex: 1 1 auto;
`;

const StyledAddButton = styled(BeHiveButton) `
   margin-left: 0.5rem!important;
`;

const FilterButton = styled(BeHiveButton) `
   margin-right: 0!important;
   margin-left: 1rem!important;
   margin-bottom: 1rem!important;
`;

const RightAlignedContent = styled(FlexWrapper) `
   justify-content: flex-end;
`;

class MainFilterBase extends React.Component {

   static propTypes = {
      onFilterChange: PropTypes.func.isRequired,
      searchTypes: PropTypes.array.isRequired,
      filterElementFactory: PropTypes.func.isRequired,
      search: PropTypes.array,
   }

   constructor(props) {
      super(props);

      this.state = {
         selectedSearchTypeId: "",
         selectedSearchTypeIds: props.search ? props.search.map(searchType => searchType.id) : [],
         searchMutationInput: props.search ? props.search : [],
      };
   }

   _addNotSelectedSearchType = (dropdownOptions, searchType) => {
      const foundSeachTypeId = this.state.selectedSearchTypeIds.find(searchTypeId => searchTypeId === searchType.id);
      if (!foundSeachTypeId) {
         dropdownOptions.push({
            key: searchType.id,
            value: searchType.id,
            text: searchType.label,
         });
      }
   }

   render() {
      const { searchTypes, filterElementFactory } = this.props;
      const { selectedSearchTypeId, selectedSearchTypeIds, searchMutationInput } = this.state;

      const options = [];
      searchTypes.forEach(searchType => this._addNotSelectedSearchType(options, searchType));

      const filterElements = [];
      selectedSearchTypeIds.forEach(searchTypeId => {
         const searchType = searchTypes.find(searchType => searchType.id === searchTypeId);
         const search = searchMutationInput.find(search => search.id === searchTypeId);

         const FilterElementClass = filterElementFactory(searchType);

         if (FilterElementClass) {
            filterElements.push(<FilterElementClass
               key={searchType.id}
               onFilterChange={this._handleFilterChange}
               onRemoveFilter={this._handleRemoveFilter}
               searchType={searchType}
               search={search}
            />);
         }
      });

      let resetLink;
      if (filterElements.length > 0) {
         resetLink = <ResetLink onClick={this._handleResetFilters}>reset</ResetLink>;
      }

      filterElements.push(
         <RightAlignedContent key="filterButtons">
            {resetLink}
            <FilterButton type="submit" content="Filter" onClick={this._handleFilterClick} />
         </RightAlignedContent>
      );

      return (
         <React.Fragment>
            <FlexWrapper>
               <HideIcon onClick={this.props.onHideFilter} name="angle double left" size="large" />
               <StyledFilterHeader onClick={this.props.onHideFilter}>Filter</StyledFilterHeader>
            </FlexWrapper>
            <FlexWrapper>
               <SearchTypeSelection search fluid selection
                  name="selectedSearchTypeId"
                  value={selectedSearchTypeId}
                  options={options}
                  onChange={this._handleChange} />
               <StyledAddButton icon onClick={this._handleAddFilter} content={<Icon className="ficon-plus" />} />
            </FlexWrapper>
            <FilterSelectionWrapper>
               {filterElements}
            </FilterSelectionWrapper>
         </React.Fragment>
      );
   }

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _handleAddFilter = (event) => {
      event.preventDefault();
      if (this.state.selectedSearchTypeId) {
         this.setState({
            selectedSearchTypeIds: [...this.state.selectedSearchTypeIds, this.state.selectedSearchTypeId],
            selectedSearchTypeId: ""
         });
      }
   }

   _handleRemoveFilter = (selectedSearchTypeId) => {
      const { searchMutationInput, selectedSearchTypeIds } = this.state,
         newState = {};

      newState.searchMutationInput = searchMutationInput.filter(mutationInput => mutationInput.id !== selectedSearchTypeId);
      newState.selectedSearchTypeIds = selectedSearchTypeIds.filter(searchTypeId => searchTypeId !== selectedSearchTypeId);

      this.setState(newState);
   }

   _handleFilterChange = (mutationInput) => {
      const searchMutationInputCopy = [...this.state.searchMutationInput];
      let selectedSearchTypeIdsHaveChanged = false;

      const foundIndex = searchMutationInputCopy.findIndex(selectedMutationInput => selectedMutationInput.id === mutationInput.id);
      if (foundIndex < 0) {
         searchMutationInputCopy.push(mutationInput);
         selectedSearchTypeIdsHaveChanged = true;
      }
      else {
         if (searchMutationInputCopy[foundIndex].searchInput !== mutationInput.searchInput) {
            searchMutationInputCopy[foundIndex] = mutationInput;
            selectedSearchTypeIdsHaveChanged = true;
         }
      }

      if (selectedSearchTypeIdsHaveChanged) {
         this.setState({ searchMutationInput: searchMutationInputCopy });
      }
   };

   _handleFilterClick = (event) => {
      event.preventDefault();

      this.props.onFilterChange(this.state.searchMutationInput);
   }

   _handleResetFilters = (event) => {
      this.props.onFilterChange([], () => {
         this.setState({
            searchMutationInput: [],
            selectedSearchTypeIds: [],
            selectedSearchTypeId: ""
         });
      });
   };
};

export default MainFilterBase;