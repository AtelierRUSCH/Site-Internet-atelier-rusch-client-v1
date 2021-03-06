const defaultUrl = 'http://localhost:5010'
const hostUrl = process.env.REACT_APP_API_URL || defaultUrl
if (!process.env.REACT_APP_API_URL) {
  console.warn(
    `'REACT_APP_API_URL' environment variable is not set! -> fallback to default url: '${defaultUrl}'`,
  )
}

const api = async (path, opts) => {
  const response = await fetch(`${hostUrl}${path}`, opts)
  // const response = await fetch(`${path}`, opts)
  if (response.ok) {
    return response.json()
  } else {
    const error = Error(await response.text())
    error.statusText = response.statusText
    error.status = response.status
    throw error
  }
}

const methodMan = method => (path, body) =>
  api(path, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

api.post = methodMan('post')
api.put = methodMan('put')
api.delete = methodMan('delete')

const getArticles = () => api('/articles')

const getFilters = () => api('/filters')

const getEquipe = () => api('/equipe')

const getThanks = () => api('/thanks')

const getContact = () => api('/contact')

const getPartenaires = () => api('/partenaires')

const newPartenaire = partenaire => api.post('/partenaires', partenaire)

const updatePartenaire = (id, partenaire) =>
  api.put(`/partenaires/${id}`, partenaire)

const deletePartenaire = (id, partenaire) =>
  api.delete(`/partenaires/${id}`, partenaire)

const newFilter = filter => api.post('/filters', filter)

const updateFilter = (id, filter) => api.put(`/filters/${id}`, filter)

const deleteFilter = (id, filter) => api.delete(`/filters/${id}`, filter)

const newArticle = article => api.post('/articles', article)

const updateArticle = (id, article) => api.put(`/articles/${id}`, article)

const deleteArticle = (id, article) => api.delete(`/articles/${id}`, article)

const newMember = member => api.post('/equipe', member)

const updateMember = (id, member) => api.put(`/equipe/${id}`, member)

const deleteMember = (id, member) => api.delete(`/equipe/${id}`, member)

const newThank = thank => api.post('/thanks', thank)

const updateThank = (id, thank) => api.put(`/thanks/${id}`, thank)

const deleteThank = (id, thank) => api.delete(`/thanks/${id}`, thank)

const updateContact = contact => api.put('/contact', contact)

// credentials routes

const loginUser = user => api.post('/sign-in', user)

const logoutUser = () => api('/sign-out')

// credentials routesgit

export default {
  getArticles,
  getFilters,
  getEquipe,
  getThanks,
  getContact,
  getPartenaires,
  newFilter,
  updateFilter,
  deleteFilter,
  newPartenaire,
  updatePartenaire,
  deletePartenaire,
  newArticle,
  updateArticle,
  deleteArticle,
  newMember,
  updateMember,
  deleteMember,
  newThank,
  updateThank,
  deleteThank,
  loginUser,
  logoutUser,
  updateContact,
}
