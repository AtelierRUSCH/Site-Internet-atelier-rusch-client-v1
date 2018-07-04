import React from 'react'
import { Link } from '@reach/router'
import api from '../api.js'

const AdminPartenaires = ({ partenaires }) => {

  console.log(partenaires)

  const allPartenaires = partenaires
   .map(el =>
    <div className='AdminCardHalfWidth'>
      <div className='currentText'> {el.shortDescription} </div>
      <div className='EditButtonsContainer'>
        <Link to={String(el.id)}>
      	 <button>E</button>
        </Link>
      	 <button onClick={()=>{api.deletePartenaire(el.id)
        window.location.reload()}} >S</button>
      </div>
    </div>
  )


  return (
    <div className='GlobalContainer'>
      <Link to='new'>
        <div className='ButtonCreateElement'>Créer un nouveau partenaire</div>
      </Link>
      <div className='AdminTitles yellow'>Partenaires :</div>
      <div className='AdminCardHalfWidthContainer'>
      {allPartenaires}
      </div>
    </div>
  )
}

export default AdminPartenaires
