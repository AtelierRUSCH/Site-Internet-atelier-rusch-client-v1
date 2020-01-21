import React, { Component } from 'react'
import { Router, Link } from '@reach/router'
import AdminLogin from './AdminLogin.js'
import AdminFiltres from './AdminFiltres.js'
import AdminNav from './AdminNav.js'
import AdminArticles from './AdminArticles.js'
import AdminPartenaires from './AdminPartenaires.js'
import { AdminNewArticle, AdminEditArticle } from './AdminArticle.js'
import { AdminNewFiltre, AdminEditFiltre } from './AdminFiltre.js'
import { AdminNewMember, AdminEditMember } from './AdminMember.js'
import { AdminNewThank, AdminEditThank } from './AdminThank.js'
import { AdminEditContact } from './AdminContact.js'
import AdminMembers from './AdminMembers.js'
import { AdminNewPartenaire, AdminEditPartenaire } from './AdminPartenaire.js'
import api from '../api'
import './css/Admin.css'

const AdminHome = () => {
  return (
    <div className="AdminHomeContainer">
      <div className="AdminHomeWelcome">
        <p style={{ margin: '0 5rem' }}>
          Hello,
          <br />
          <br />
          Te voici bien arrivé(e) sur l'espace Administrateur du site Rusch !
          <br />
          Cette interface permet de créer, modifier et supprimer des éléments.
        </p>
      </div>
      <Link to="/admin/articles">
        <div className="AdminHomeLinkTo">Articles</div>
      </Link>

      <Link to="/admin/filtres">
        <div className="AdminHomeLinkTo">Filtres</div>
      </Link>

      <Link to="/admin/equipe">
        <div className="AdminHomeLinkTo">Equipe</div>
      </Link>

      <Link to="/admin/partenaires">
        <div className="AdminHomeLinkTo">Partenaires</div>
      </Link>

      <Link to="/admin/contact">
        <div className="AdminHomeLinkTo">Contact</div>
      </Link>
    </div>
  )
}

class Admin extends Component {
  state = {
    articles: [],
    filtres: [],
    equipe: [],
    thanks: [],
    partenaires: [],
    contact: {},
    isAuth: Boolean(window.localStorage.isAuth),
  }

  login = () => {
    window.localStorage.isAuth = 'yes'
    this.setState({ isAuth: true })
  }

  logout = () => {
    api.logoutUser()
    window.localStorage.isAuth = ''
    this.setState({ isAuth: false })
  }

  syncDatas = () => {
    api.getArticles().then(articles => this.setState({ articles: articles }))

    api.getFilters().then(filtres => this.setState({ filtres: filtres }))

    api.getEquipe().then(equipe => this.setState({ equipe: equipe }))

    api.getThanks().then(thanks => this.setState({ thanks: thanks }))

    api
      .getPartenaires()
      .then(partenaires => this.setState({ partenaires: partenaires }))

    api.getContact().then(contact => this.setState({ contact: contact }))
  }

  componentDidMount() {
    this.syncDatas()
  }

  render() {
    if (!this.state.isAuth) {
      return <AdminLogin path="" login={this.login} />
    }
    return (
      <div className="App">
        <AdminNav logout={this.logout} />
        <div className="spacer" />
        <Router>
          <AdminHome path="/" />
          <AdminArticles path="articles" articles={this.state.articles} />
          <AdminNewArticle path="articles/new" />
          <AdminEditArticle
            path="articles/:articleId"
            articles={this.state.articles}
          />
          <AdminFiltres path="filtres" filtres={this.state.filtres} />
          <AdminEditFiltre
            path="filtres/:filtreId"
            filtres={this.state.filtres}
          />
          <AdminNewFiltre path="filtres/new" />
          <AdminMembers
            path="equipe"
            members={this.state.equipe}
            thanks={this.state.thanks}
          />
          <AdminEditMember
            path="equipe/:memberId"
            members={this.state.equipe}
          />
          <AdminNewMember path="equipe/new" />
          <AdminEditThank
            path="equipe/thanks/:thankId"
            thanks={this.state.thanks}
          />
          <AdminNewThank path="equipe/thanks/new" />
          <AdminPartenaires
            path="partenaires"
            partenaires={this.state.partenaires}
          />
          <AdminNewPartenaire path="partenaires/new" />
          <AdminEditPartenaire
            path="partenaires/:partenaireId"
            partenaires={this.state.partenaires}
          />
          <AdminEditContact path="contact" contactData={this.state.contact} />
        </Router>
      </div>
    )
  }
}

export default Admin
