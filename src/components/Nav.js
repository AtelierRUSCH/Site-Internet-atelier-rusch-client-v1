import React from 'react'
import { Link } from '@reach/router'
import './css/Nav.css'
import Logo from './img/logo-rusch-noir.png'
import { loadArticles } from '../actions'
import store from '../store'

const Nav = ({onPageChange}) =>
  <div className="NavBar">

    <div className='Logo'>
      <Link onClick={() => window.scrollTo(0, 0)} to='/'>
        <button className='HomeLink' value='Home'>
          <img style={{ width: '75px' }} src={Logo} alt='logo-rusch-noir' />
        </button>
      </Link>
    </div>

    <div className="NavBarLinksContainer">
      <Link onClick={() => window.scrollTo(0, 0)} className={window.location.pathname === '/atelier' ? 'NavBarLink active' : 'NavBarLink'} to='/atelier'>Atelier</Link>
<<<<<<< HEAD
      <Link onClick={() => { window.scrollTo(0, 0) }} className={window.location.pathname === '/projets' ? 'NavBarLink active' : 'NavBarLink'} to='/projets'>Projets</Link>
      <Link onClick={() => { window.scrollTo(0, 0) }} className={window.location.pathname === '/lab' ? 'NavBarLink active' : 'NavBarLink'} to='/lab'>LabRusch</Link>
=======
      <Link onClick={() => {
        store.dispatch(loadArticles(this.state.articles))
        window.scrollTo(0, 0)
<<<<<<< HEAD
      }} className={window.location.pathname === '/projets' ? 'NavBarLink active' : 'NavBarLink'} to='/projets'>Projets</Link>
=======
        window.history.go(0)
        console.log('okokok')
      }} className={window.location.pathname === '/projets' ? 'NavBarLink active' : 'NavBarLink'} to='/projets'>Projects</Link>
>>>>>>> 0f39d05068f610f418850753422352b0ef756cc8
      <Link onClick={() => {
        store.dispatch(loadArticles(this.state.articles))
        window.scrollTo(0, 0)
<<<<<<< HEAD
=======
        window.history.go(0)
        console.log('okokok')
>>>>>>> 0f39d05068f610f418850753422352b0ef756cc8
      }} className={window.location.pathname === '/lab' ? 'NavBarLink active' : 'NavBarLink'} to='/lab'>LabRusch</Link>
>>>>>>> a78513ec55215005a88b4f8cb756a2b235e0f106
      <Link onClick={() => window.scrollTo(0, 0)} className={window.location.pathname === '/contact' ? 'NavBarLink active' : 'NavBarLink'} to='/contact'>Contact</Link>
    </div>

  </div>

export default Nav
