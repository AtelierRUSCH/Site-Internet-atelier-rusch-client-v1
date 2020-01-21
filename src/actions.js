export const loadArticles = articles => ({ type: 'LOAD_ARTICLES', articles })

export const loadFilters = filters => ({ type: 'LOAD_FILTERS', filters })

export const loadMembers = members => ({ type: 'LOAD_MEMBERS', members })

export const loadThanks = thanks => ({ type: 'LOAD_THANKS', thanks })

export const loadContact = contact => ({ type: 'LOAD_CONTACT', contact })

export const loadPartners = partners => ({ type: 'LOAD_PARTNERS', partners })

export const loadModale = (id, displayModale) => ({ type: 'LOAD_MODALE', id, displayModale })

export const toggleFilters = id => ({ type: 'TOGGLE_FILTERS', id })
