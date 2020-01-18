import React, { Fragment } from 'react'
import Nav from './Nav.js'
import Facebook from './img/fb.png'
import Instagram from './img/instagram.png'
import Linkedin from './img/linkedin.png'
import './css/Contact.css'
import store from '../store.js'

const Contact = () => {
  const state = store.getState()
  const contact =
    state.contact && state.contact.contact && state.contact.contact[0]

  return (
    <div>
      <Nav />
      <div className="spacer" />
      <div className="Contact">
        <h2 className="green">Contactez l'Atelier !</h2>

        <div className="address currentText">
          <div className="pre">
            <h4>Adresse</h4>
            {contact && contact.address}
            <br />
            <br />
            {contact && contact.additionalInfo}
            <br />
          </div>
          <div>
            <h4>Contacts</h4>
            <a href={`mailto:${contact && contact.mail}`}>
              {contact && contact.mail}
            </a>
            <br />
            <div className="pre">{contact && contact.phone}</div>
            <div className="reseaux">
              <a
                href={contact && contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Facebook} alt="facebook" />
              </a>
              <a
                href={contact && contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Instagram} alt="instagram" />
              </a>
              <a
                href={contact && contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Linkedin} alt="linkedin" />
              </a>
            </div>
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9584248426695!2d2.4236420157030865!3d48.85900317928745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66d637a1305c1:0x90a47eaa3ee8cf50!2sICImontreuil!5e0!3m2!1sfr!2sfr!4v1530026135912"
          title="iframe-google-maps"
          width="600"
          height="450"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default Contact
