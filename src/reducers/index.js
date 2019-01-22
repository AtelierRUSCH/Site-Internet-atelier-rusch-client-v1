import { combineReducers } from 'redux'
import articles from './articles'
import filters from './filters'
import articleform from './articleform'
import members from './members'
import thanks from './thanks'
import partners from './partners'

const reducer = combineReducers({
  articles,
  filters,
  articleform,
  members,
  thanks,
  partners
})

export default reducer
