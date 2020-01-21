import React, { useState } from 'react'
import { navigate } from '@reach/router'
import api from '../api.js'

const handleSubmit = contact =>
  api
    .updateContact(contact)
    .then(() => navigate('/admin/contact'))
    .then(() => window.location.reload())

const handleChange = (event, setContact, contact) => {
  const key = event.target.name
  setContact({
    ...contact,
    [key]: event.target.value,
    errorPost: '',
  })
}

export const AdminEditContact = ({ contactData }) => {
  const [contact, setContact] = useState({
    address: contactData.address || '',
    additionalInfo: contactData.additionalInfo || '',
    mail: contactData.mail || '',
    phone: contactData.phone || '',
    facebook: contactData.facebook || '',
    instagram: contactData.instagram || '',
    linkedin: contactData.linkedin || '',
    errorPost: '',
  })

  return (
    <form onSubmit={() => handleSubmit(contact)}>
      <div className="formTitle yellow">Infos de contact :</div>
      <TextInput
        label="Adresse"
        value={contact.address}
        setContact={setContact}
        contact={contact}
      />
      <TextInput
        label="Info"
        value={contact.additionalInfo}
        setContact={setContact}
        contact={contact}
      />
      <TextInput
        label="Mail"
        value={contact.mail}
        setContact={setContact}
        contact={contact}
      />
      <TextInput
        label="Téléphones"
        value={contact.phone}
        setContact={setContact}
        contact={contact}
      />
      <TextInput
        label="Facebook"
        value={contact.facebook}
        setContact={setContact}
        contact={contact}
      />
      <TextInput
        label="Instagram"
        value={contact.instagram}
        setContact={setContact}
        contact={contact}
      />
      <TextInput
        label="Linkedin"
        value={contact.linkedin}
        setContact={setContact}
        contact={contact}
      />
      <input className="submit" type="submit" value="Enregistrer" />
      <div className="errorPost">{contact.errorPost}</div>
    </form>
  )
}

const TextInput = ({ label, value, setContact, contact }) => (
  <label>
    {label} :<br />
    <input
      type="text"
      name="name"
      value={value}
      onChange={e => handleChange(e, setContact, contact)}
    />
  </label>
)
