import React from 'react';
import PropTypes from 'prop-types';

import MainFilterBase from '../../../components/filter/MainFilterBase';

class MainUserFilter extends React.Component {

   static propTypes = {
      onFilterChange: PropTypes.func.isRequired,
      onHideFilter: PropTypes.func.isRequired,
      search: PropTypes.array,
   }

   render() {
      const {
         onFilterChange,
         search,
         onHideFilter,
      } = this.props;

      let searchTypes = [];

      return (
         <MainFilterBase
            search={search}
            onFilterChange={onFilterChange}
            searchTypes={searchTypes}
            onHideFilter={onHideFilter}
            filterElementFactory={this._filterElementFactory} />
      );
   }

   _filterElementFactory = (searchType) => {
      switch (searchType.type) {
         default:
            return null;
      }
   }
};


export default MainUserFilter;