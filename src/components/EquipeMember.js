import React from 'react'
import './css/Equipe.css'

const EquipeMember = ({ member }) => (
  <div className="memberContainer" style={{ zIndex: `${member.id}` }}>
    <div
      className="memberPic"
      style={{ backgroundImage: `url(${member.image})` }}
    />
    <div className="memberName green">{member.name}</div>
    <h6>{member.position}</h6>
    <div className="memberContent">{member.description}</div>
    <div className="memberContent">
      <u>Son parcours</u> :&nbsp;
      {member.carreer}
    </div>
    <div className="smallLinksContainer">
      <a
        href={member.linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className="smallLink"
      >
        Son LinkedIn
      </a>
    </div>
  </div>
)

export default EquipeMember
