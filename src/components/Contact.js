import React, { Fragment } from 'react'
import Nav from './Nav.js'
import Facebook from './img/fb.png'
import Instagram from './img/instagram.png'
import Linkedin from './img/linkedin.png'
import './css/Contact.css'

// get from db
const contactData = {
  address: ['ICIMontreuil', '135 boulevard Chanzy', '93100 Montreuil'],
  additionalInfo: ['Metro : Robespierre ligne 9'],
  mail: ['bonjour@atelier-rusch.com'],
  phone: [
    { name: 'Marie', number: '+33 6 83 09 86 16' },
    { name: 'Michael', number: '+33 6 69 17 12 83' }
  ],
  rs: {
    fb: 'https://www.facebook.com/collectifrusch/',
    ig: '"https://www.instagram.com/atelier_rusch/"',
    li: '"https://www.linkedin.com/company/atelierrusch/"'
  }
}

const Contact = () => (
  <div>
    <Nav />
    <div className="spacer" />
    <div className="Contact">
      <h2 className="green">Contactez l'Atelier !</h2>

      <div className="address currentText">
        <div>
          <h4>Adresse</h4>
          {contactData.address.map((line, i) => (
            <Fragment key={`adress-line${i + 1}`}>
              {line}
              <br />
            </Fragment>
          ))}
          <br />
          {contactData.additionalInfo.map((line, i) => (
            <Fragment key={`additional-info-line${i + 1}`}>
              {line}
              <br />
            </Fragment>
          ))}
        </div>
        <div>
          <h4>Contacts</h4>
          {contactData.mail.map(mail => (
            <Fragment>
              <a href={`mailto:${mail}`}>{mail}</a>
              <br />
            </Fragment>
          ))}
          {Object.values(contactData.phone).map(({ name, number }) => (
            <Fragment>
              {name}: {number}
              <br />
            </Fragment>
          ))}
          <div className="reseaux">
            <a
              href="https://www.facebook.com/collectifrusch/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Facebook} alt="facebook" />
            </a>
            <a
              href="https://www.instagram.com/atelier_rusch/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Instagram} alt="instagram" />
            </a>
            <a
              href="https://www.linkedin.com/company/atelierrusch/"
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

export default Contact
