import React from 'react'
import AdminThankForm from './AdminThankForm'
import api from '../api.js'

export const AdminNewThank = () => {
  return (
    <div>
      <AdminThankForm thank={{}} submitThank={api.newThank} />
    </div>
  )
}

export const AdminEditThank = ({ thankId, thanks }) => {
  const thank = thanks.find(a => String(a.id) === thankId)

  return (
    <div>
      {thank ? (
        <AdminThankForm
          thank={thank}
          submitThank={thank => api.updateThank(thankId, thank)}
        />
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  )
}
