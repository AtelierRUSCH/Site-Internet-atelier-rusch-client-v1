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
  })
}

export const AdminEditContact = ({ contactData }) => {
  const [contact, setContact] = useState({
    addresse: contactData.address || '',
    indications: contactData.additionalInfo || '',
    email: contactData.mail || '',
    téléphone: contactData.phone || '',
    facebook: contactData.facebook || '',
    instagram: contactData.instagram || '',
    linkedin: contactData.linkedin || '',
  })

  const [errorPost, setErrorPost] = useState('')

  return (
    <form onSubmit={() => handleSubmit(contact)}>
      <div className="formTitle yellow">Infos de contact :</div>
      {Object.entries(contact).map(([key, value]) => (
        <Input
          key={key}
          type={value.includes('\n') ? 'textarea' : 'text'}
          label={key}
          value={value}
          setContact={setContact}
          contact={contact}
        />
      ))}
      <input className="submit" type="submit" value="Enregistrer" />
      <div className="errorPost">{errorPost}</div>
    </form>
  )
}

const TextArea = ({ ...props }) => <textarea type="textarea" {...props} />
const TextInput = ({ ...props }) => <input type="text" {...props} />

const Input = ({ label, setContact, contact, type, ...props }) => {
  const InputType = (type === 'textarea' && TextArea) || TextInput
  return (
    <label>
      {label} :<br />
      <InputType
        name={label}
        onChange={e => handleChange(e, setContact, contact)}
        {...props}
      />
    </label>
  )
}
