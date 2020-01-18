import { combineReducers } from 'redux'
import articles from './articles'
import filters from './filters'
import articleform from './articleform'
import members from './members'
import thanks from './thanks'
import partners from './partners'
import contact from './contact'

const reducer = combineReducers({
  articles,
  filters,
  articleform,
  members,
  thanks,
  partners,
  contact,
})

export default reducer
