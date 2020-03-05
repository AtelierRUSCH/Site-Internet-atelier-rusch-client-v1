import React, { Component, useState, Fragment } from 'react'
import Modale from './Modale.js'
import { Container, Draggable } from 'react-smooth-dnd'
import './css/ArticleForm.css'
import { navigate } from '@reach/router'
import store from '../store.js'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import { Layout } from './Layout.js'

const formatDate = () => {
  const today = new Date(Date.now())
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  return `${year}-${month}-${day}`
}

const freshArticle = {
  title: '',
  date: formatDate(),
  client: '',
  place: '',
  type: '',
  shortDescription: '',
  projectLink: '',
  section: '',
  headerImage: '',
  tags: [],
  hasStar: '0',
  hasImage: '0',
  content: [],
  partners: [],
  isDraft: false,
  suggestion: 0,
}

const H2 = ({ element, children, ...rest }) => {
  return (
    <div>
      <div className="draggableElement">
        <label className="moveCursor">Ajouter un titre de paragraphe :</label>
        {children}
      </div>
      <input
        className="field"
        type="text"
        value={element.value}
        {...rest}
        autoFocus
      />
    </div>
  )
}

class MyEditor extends React.Component {
  constructor(props) {
    super(props)
    let contentState = stateFromHTML(props.element.value)
    this.state = {
      editorState: EditorState.createWithContent(contentState),
      value: props.element.value,
      name: props.name,
    }
    this.onChangeHandle = this.props.onChange.bind(this)
    this.setDomEditorRef = ref => (this.domEditor = ref)
  }

  onChange = editorState => {
    this.setState({
      editorState,
      value: stateToHTML(editorState.getCurrentContent()),
    })
    this.onChangeHandle({ name: this.state.name, value: this.state.value })
  }

  _onClick = e => {
    e.preventDefault()
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, e.target.name),
    )
  }

  componentDidMount() {
    this.domEditor.focus()
  }

  render() {
    const styles = ['BOLD', 'ITALIC', 'UNDERLINE']
    const buttons = styles.map(style => {
      return (
        <button
          className={`draftBtn ${style.toLowerCase()}`}
          key={style}
          onClick={this._onClick}
          name={style}
        >
          {style.slice(0, 1)}
        </button>
      )
    })
    return (
      <div style={{ flexDirection: 'column' }} className="draggableElement">
        <div className="labelContainer">
          <label className="moveCursor">Ajouter un paragraphe :</label>
          {this.props.children}
        </div>
        <div className="field">
          <div className="text-editor-toolbar">{buttons}</div>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            value={this.state.value}
            {...this.props.rest}
            autoFocus
            ref={this.setDomEditorRef}
          />
        </div>
      </div>
    )
  }
}

const Blockquote = ({ element, children, ...rest }) => {
  return (
    <div>
      <div className="draggableElement">
        <label className="moveCursor">Ajouter une citation :</label>
        {children}
      </div>
      <textarea
        className="field"
        type="text"
        value={element.value}
        {...rest}
        autoFocus
      />
    </div>
  )
}

const Caption = ({ element, children, ...rest }) => {
  return (
    <div>
      <div className="draggableElement">
        <label className="moveCursor">Ajouter une légende :</label>
        {children}
      </div>
      <textarea
        className="field"
        type="text"
        value={element.value}
        {...rest}
        autoFocus
      />
    </div>
  )
}

const Abstract = ({ element, children, ...rest }) => {
  return (
    <div>
      <div className="draggableElement">
        <label className="moveCursor">Ajouter un abstract :</label>
        {children}
      </div>
      <textarea
        className="field"
        type="text"
        value={element.value}
        {...rest}
        autoFocus
      />
    </div>
  )
}

const Imgs = ({ element, children, ...rest }) => {
  return (
    <div>
      <div className="draggableElement">
        <label className="moveCursor">Ajouter des images :</label>
        {children}
      </div>
      <input
        className="field"
        type="text"
        value={element.value}
        {...rest}
        autoFocus
      />
    </div>
  )
}

const Video = ({ element, children, ...rest }) => {
  return (
    <div>
      <div className="draggableElement">
        <label className="moveCursor">Ajouter une vidéo :</label>
        {children}
      </div>
      <input
        className="field"
        type="text"
        value={element.value}
        {...rest}
        autoFocus
      />
    </div>
  )
}

const Composition = ({
  element,
  children,
  state,
  handleChange,
  name,
  ...rest
}) => {
  const [images, setImages] = useState(element.value.images || {})
  const [justification, setJustification] = useState(
    element.value.justification || 'flex-start',
  )
  const [margins, setMargins] = useState(element.value.margins || false)
  const [borders, setBorders] = useState(element.value.borders || false)

  return (
    <div>
      <div className="draggableElement">
        <label className="moveCursor">Ajouter une composition d'images :</label>
        {children}
      </div>
      <Layout
        width="35vw"
        name={name}
        images={images}
        setImages={setImages}
        justification={justification}
        setJustification={setJustification}
        margins={margins}
        setMargins={setMargins}
        borders={borders}
        setBorders={setBorders}
        handleChange={() =>
          handleChange(name, {
            images,
            justification,
            borders,
            margins,
          })
        }
        {...rest}
      />
    </div>
  )
}

const toInput = {
  h2: props => <H2 {...props} />,
  p: props => <MyEditor {...props} />,
  blockquote: props => <Blockquote {...props} />,
  caption: props => <Caption {...props} />,
  abstract: props => <Abstract {...props} />,
  imgs: props => <Imgs {...props} />,
  video: props => <Video {...props} />,
  composition: props => <Composition {...props} />,
}

const Element = props => toInput[props.element.type](props)

const moveElement = (array, fromIndex, toIndex) => {
  const elem = array[fromIndex]
  const popedArray = array.filter((_, index) => index !== fromIndex)

  return [...popedArray.slice(0, toIndex), elem, ...popedArray.slice(toIndex)]
}

class ArticleForm extends Component {
  state = {
    article: this.props.article || freshArticle,
    errorPost: '',
    fullScreen: false,
  }

  handleDnd = ({ removedIndex: fromIndex, addedIndex: toIndex }) => {
    const content = this.state.article.content
    const reorderedContent = moveElement(content, fromIndex, toIndex)

    const updatedArticle = {
      ...this.state.article,
      content: reorderedContent,
    }
    this.setState({ article: updatedArticle })
  }

  handleChange = (name, value) => {
    const key = name

    let article = {}

    if (key.startsWith('content')) {
      const index = key.split('-')[1]

      const content = [...this.state.article.content]
      content[index].value = value

      article = {
        ...this.state.article,
        content: content,
      }
    } else if (key.startsWith('hasStar')) {
      article = {
        ...this.state.article,
        hasStar: this.state.article.hasStar === '1' ? '0' : '1',
      }
    } else if (key.startsWith('hasImage')) {
      article = {
        ...this.state.article,
        hasImage: this.state.article.hasImage === '1' ? '0' : '1',
      }
    } else if (key.startsWith('section')) {
      article = {
        ...this.state.article,
        section: value,
        tags: [],
      }
    } else if (key.startsWith('tags')) {
      if (this.state.article.tags.includes(value)) {
        article = {
          ...this.state.article,
          tags: this.state.article.tags.filter(tag => tag !== value),
        }
      } else {
        article = {
          ...this.state.article,
          tags: [...this.state.article.tags, value],
        }
      }
    } else if (key.startsWith('partners')) {
      if (this.state.article.partners.includes(value)) {
        article = {
          ...this.state.article,
          partners: this.state.article.partners.filter(
            partner => partner !== value,
          ),
        }
      } else {
        article = {
          ...this.state.article,
          partners: [...this.state.article.partners, value],
        }
      }
    } else {
      article = {
        ...this.state.article,
        [key]: value,
      }
    }
    this.setState({ article, errorPost: '' })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.article.title === '') {
      this.setState({ errorPost: '* Il faut renseigner un titre !' })
    } else if (this.state.article.shortDescription === '') {
      this.setState({ errorPost: '* Il faut renseigner une description !' })
    } else if (this.state.article.headerImage === '') {
      this.setState({
        errorPost: '* Il faut ajouter une image de couverture !',
      })
    } else if (this.state.article.section === '') {
      this.setState({ errorPost: '* Il faut sélectionner une section !' })
    } else if (this.state.article.tags.length === 0) {
      this.setState({ errorPost: '* Il faut sélectionner au moins un tag !' })
    } else if (this.state.article.content.length === 0) {
      this.setState({ errorPost: '* Il faut mettre du contenu !' })
    } else if (event.target.name.startsWith('isDraft')) {
      this.props
        .submitArticle({ ...this.state.article, isDraft: true })
        .then(navigate('/admin/articles'))
        .then(() => window.location.reload())
    } else {
      this.props
        .submitArticle({ ...this.state.article, isDraft: false })
        .then(() => navigate('/admin/articles'))
        .then(() => window.location.reload())
    }
  }

  addInput = type => {
    const basicContentElement = {
      h2: { type: 'h2', value: '' },
      p: { type: 'p', value: '' },
      blockquote: { type: 'blockquote', value: '' },
      caption: { type: 'caption', value: '' },
      abstract: { type: 'abstract', value: '' },
      imgs: { type: 'imgs', value: '' },
      video: { type: 'video', value: '' },
      composition: { type: 'composition', value: '' },
    }

    const article = {
      ...this.state.article,
      content: [...this.state.article.content, basicContentElement[type]],
    }
    this.setState({ article })
  }

  removeInput = i => {
    const article = {
      ...this.state.article,
      content: this.state.article.content.filter(
        index => index !== this.state.article.content[i],
      ),
    }
    this.setState({ article })
  }

  render() {
    const article = this.state.article

    const buttons = [
      { type: 'h2', value: 'Titre de paragraphe' },
      { type: 'p', value: 'Paragraphe' },
      { type: 'blockquote', value: 'Citation' },
      { type: 'caption', value: 'Légende' },
      { type: 'abstract', value: 'Abstract' },
      { type: 'imgs', value: 'Images' },
      { type: 'video', value: 'Vidéo' },
      { type: 'composition', value: `Composition d'images` },
    ].map((button, i) => (
      <input
        type="button"
        key={i}
        onClick={() => this.addInput(button.type)}
        value={button.value}
      />
    ))

    const dynamicInputs = article.content.map((element, i, children) => (
      <Draggable
        style={{ display: 'flex', flexDirection: 'column' }}
        key={i}
        className="onDrop"
      >
        <Element
          state={this.state}
          handleChange={this.handleChange}
          key={i}
          name={`content-${i}`}
          element={element}
          i={i}
          onChange={event =>
            event.name
              ? this.handleChange(event.name, event.value)
              : this.handleChange(event.target.name, event.target.value)
          }
        >
          <button
            type="button"
            className="removeModule field"
            onClick={() => this.removeInput(i)}
          >
            ✕
          </button>
        </Element>
      </Draggable>
    ))

    const state = store.getState()

    const articles = state.articles.allArticles

    const articlesToSuggest = articles
      .filter(a => a.id !== article.id)
      .filter(a => a.isDraft === '0')

    const TagCard = ({ tag }) => (
      <button
        key={tag.id}
        type="button"
        name="tags"
        className={
          this.state.article.tags.includes(`${tag.filterTag}`)
            ? 'TagCard TagCardSelected'
            : 'TagCard'
        }
        value={tag.filterTag}
        onClick={event =>
          this.handleChange(event.target.name, event.target.value)
        }
      >
        {tag.filterTag}
      </button>
    )

    const TagCards = state.filters.allFilters
      .filter(tag => this.state.article.section === tag.section)
      .map(tag => <TagCard key={tag.id} tag={tag} />)

    const PartnerCard = ({ partner }) => (
      <button
        key={partner.id}
        type="button"
        name="partners"
        className={
          this.state.article.partners.includes(`${partner.name}`)
            ? 'TagCard TagCardSelected'
            : 'TagCard'
        }
        value={partner.name}
        onClick={event =>
          this.handleChange(event.target.name, event.target.value)
        }
      >
        {partner.name}
      </button>
    )

    const PartnersCards = state.partners.allPartners.map(partner => (
      <PartnerCard key={partner.id} partner={partner} />
    ))

    return (
      <div>
        <div className="box">
          <div className="item-left">
            <div style={{ marginTop: '15px' }}>
              <form onSubmit={this.handleSubmit}>
                <div className="formTitle yellow">Nouvel article :</div>
                <label>
                  Titre de l'article :<br />
                  <input
                    type="text"
                    name="title"
                    value={article.title}
                    onChange={event =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                  />
                </label>
                <label>
                  Date de l'article :<br />
                  <input
                    type="date"
                    name="date"
                    value={article.date}
                    onChange={event =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                  />
                </label>
                <label>
                  Client :<br />
                  <input
                    type="text"
                    name="client"
                    value={article.client}
                    onChange={event =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                  />
                </label>
                <label>
                  Lieu :<br />
                  <input
                    type="text"
                    name="place"
                    value={article.place}
                    onChange={event =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                  />
                </label>
                <label>
                  Type :<br />
                  <input
                    type="text"
                    name="type"
                    value={article.type}
                    onChange={event =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                  />
                </label>
                <label>
                  Description de l'article :<br />
                  <textarea
                    type="text"
                    name="shortDescription"
                    value={article.shortDescription}
                    onChange={event =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                  />
                </label>
                <label>
                  Lien externe vers un site du projet :<br />
                  <input
                    type="text"
                    name="projectLink"
                    value={article.projectLink}
                    onChange={event =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                  />
                </label>
                <label>
                  URL de l'image de couverture:
                  <br />
                  <input
                    type="text"
                    name="headerImage"
                    value={article.headerImage}
                    onChange={event =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                  />
                </label>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label>
                    Choisissez la section :
                    <select
                      name="section"
                      value={article.section}
                      onChange={event =>
                        this.handleChange(event.target.name, event.target.value)
                      }
                    >
                      <option value="">Choisissez la section :</option>
                      <option value="lab">LabRusch</option>
                      <option value="projets">Projets</option>
                    </select>
                  </label>
                </div>
                <label>
                  Tags de l'article :<br />
                </label>
                <div className="TagCardsContainer">{TagCards}</div>

                <label>
                  Partenaires du projet :<br />
                </label>
                <div className="TagCardsContainer">{PartnersCards}</div>

                <label>
                  Article en suggestion en fin de page :
                  <select
                    name="suggestion"
                    value={article.suggestion || undefined}
                    onChange={event =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                  >
                    <option value={0}>Choisissez un article :</option>
                    {articlesToSuggest.map(a => (
                      <option key={a.id} value={a.id}>
                        {a.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label style={{ marginTop: '1rem' }}>
                  Mettre une image sur la vignette de l'article :
                  <button
                    className={
                      article.hasImage === '1' ? 'hasStar' : 'hasNoStar'
                    }
                    style={{
                      cursor: 'pointer',
                      lineHeight: '0.5rem',
                      fontSize: '2.7rem',
                      padding: '0',
                      margin: '-7px 0 0 12px',
                    }}
                    type="button"
                    name="hasImage"
                    onClick={event =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                  >
                    •
                  </button>
                </label>

                <label style={{ marginTop: '2.5rem' }}>
                  Mettre l'article à la une :
                  <button
                    className={
                      article.hasStar === '1' ? 'hasStar' : 'hasNoStar'
                    }
                    style={{
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      padding: '0',
                      margin: '0 0 0 10px',
                    }}
                    type="button"
                    name="hasStar"
                    onClick={event =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                  >
                    ★
                  </button>
                </label>

                <div className="addModule yellow">Ajouter un module :</div>
                <Container
                  lockAxis="y"
                  dragClass="opacity-ghost"
                  onDrop={this.handleDnd}
                  nonDragAreaSelector=".field"
                  className="DynamicInputs"
                >
                  {dynamicInputs}
                </Container>
                <div
                  id="buttons"
                  style={{
                    backgroundColor: 'transparent',
                    marginBottom: '20px',
                  }}
                >
                  {buttons}
                </div>
                <input
                  className="draft"
                  type="submit"
                  name="isDraft"
                  value="Enregistrer comme brouillon"
                  onClick={this.handleSubmit}
                />
                <input
                  className="submit"
                  type="submit"
                  value="Publier l'article"
                />
                <div className="errorPost">{this.state.errorPost}</div>
              </form>
            </div>
          </div>
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              overflow: 'auto',
              zIndex: this.state.fullScreen ? 11000 : 5000,
            }}
            className={
              this.state.fullScreen
                ? 'ModaleBlock'
                : 'item-right ModaleBlockPreview'
            }
          >
            <div
              onClick={() =>
                this.setState({ fullScreen: !this.state.fullScreen })
              }
              style={{
                width: this.state.fullScreen ? '100%' : '50%',
              }}
              className="fullScreenBanner"
            >
              <div className="fullScreenArrow">
                {this.state.fullScreen ? '⟵' : '⟶'}
              </div>
              {this.state.fullScreen
                ? 'Retour au mode Édition'
                : 'Mode plein écran'}
            </div>
            {this.state.fullScreen && <div className="fullScreenPlaceholder" />}
            <Modale
              article={article}
              setFullScreen={() => this.setState({ fullScreen: false })}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleForm
