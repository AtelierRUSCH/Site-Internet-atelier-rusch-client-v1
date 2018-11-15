import React from 'react'
import './css/Partenaire.css'

const Partenaire = ({ partner }) =>
  <div className="PartenaireContainer">
    <div style={{ backgroundImage: `url(${partner.image})` }} className="LogoPartenaire" />
    <h6>{partner.shortDescription}</h6>
  </div>

export default Partenaire
