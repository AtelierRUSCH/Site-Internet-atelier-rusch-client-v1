import React, { Component } from 'react'
import { navigate } from '@reach/router'
import './css/ArticleForm.css'

class AdminThankForm extends Component {
  state = {
    name: this.props.thank.name || '',
    url: this.props.thank.url || '',
    errorPost: '',
  }

  handleChange = event => {
    const key = event.target.name
    this.setState({
      ...this.state.filtre,
      [key]: event.target.value,
      errorPost: '',
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.name === '') {
      this.setState({ errorPost: '* Il faut renseigner un nom !' })
      // } else if (this.state.url === '') {
      //   this.setState({ errorPost: '* Il faut renseigner une URL !' })
    } else {
      this.props
        .submitThank(this.state)
        .then(() => navigate('/admin/equipe'))
        .then(() => window.location.reload())
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="formTitle yellow">Nouveau remerciement :</div>
        <label>
          Nom :<br />
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Lien :<br />
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
          />
        </label>
        <input className="submit" type="submit" value="Publier" />
        <div className="errorPost">{this.state.errorPost}</div>
      </form>
    )
  }
}

export default AdminThankForm
