import React from 'react'
import './css/Partenaire.css'

const Partenaire = ({ partner }) => (
  <a href={partner.url} target="_blank">
    <div className="PartenaireContainer">
      <div
        style={{ backgroundImage: `url(${partner.image})` }}
        className="LogoPartenaire"
      />
      <h6>{partner.shortDescription}</h6>
    </div>
  </a>
)

export default Partenaire
