import React from 'react'
import Filter from './Filter.js'
import './css/Filter.css'
import store from '../store.js'

const FiltersSection = () => {
  const state = store.getState()

  const getFiltersNames = state.filters.allFilters.filter(
    filter => filter.section === window.location.pathname.slice(1)
  )

  const filtersNames = getFiltersNames.map((filter, i) => (
    <Filter key={i} filter={filter} filtersLength={getFiltersNames.length} />
  ))

  return (
    <div className="FiltersSection">
      <div className="FilterTitle">
        <h6>Filtrer:</h6>
      </div>
      <div className="FiltersContainer">{filtersNames}</div>
    </div>
  )
}

export default FiltersSection
