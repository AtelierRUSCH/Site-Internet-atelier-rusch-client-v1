import React from 'react'
import './css/Filter.css'
import store from '../store.js'
import { toggleFilters } from '../actions.js'

const Filter = ({ filter, filtersLength }) => {
  const toggleFiltersAndFilterArticles = () => {
    store.dispatch(toggleFilters(filter.id))
  }
  return (
    <button
      style={filtersLength <= 3 ? { width: '33%' } : { width: '25%' }}
      className={filter.isActive ? 'Filter FilterActive' : 'Filter'}
      onClick={event => toggleFiltersAndFilterArticles()}
    >
      <h6>{filter.filterTag}</h6>
    </button>
  )
}

export default Filter
