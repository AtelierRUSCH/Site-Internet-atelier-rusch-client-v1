import React, { useState, useEffect } from 'react'
import { Editor, EditorState, RichUtils, CompositeDecorator } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'

export const TextEditor = ({ handleChange, ...props }) => {
  const contentState = stateFromHTML(props.element.value, options)
  const decorators = [{ strategy: findLinkEntities, component: EditorLink }]

  const [state, setState] = useState({
    editorState: EditorState.createWithContent(
      contentState,
      new CompositeDecorator(decorators),
    ),
    value: props.element.value,
    name: props.name,
    showURLInput: false,
    urlValue: '',
  })

  const onChange = (editorState) => {
    setState({
      ...state,
      editorState,
      value: stateToHTML(editorState.getCurrentContent(), options),
    })
    handleChange(state.name, state.value)
  }

  return (
    <div style={{ flexDirection: 'column' }} className="draggableElement">
      <div className="labelContainer">
        <label className="moveCursor">Ajouter un paragraphe :</label>
        {props.children}
      </div>
      <div className="field">
        <Buttons state={state} setState={setState} onChange={onChange} />
        <Editor
          editorState={state.editorState}
          onChange={onChange}
          value={state.value}
          autoFocus
          {...props.rest}
        />
        <URLInput state={state} setState={setState} />
      </div>
    </div>
  )
}

const options = {
  entityStyleFn: (entity) => {
    const entityType = entity.get('type').toLowerCase()
    if (entityType === 'link') {
      const data = entity.getData()
      return {
        element: 'a',
        attributes: {
          href: data.url,
          target: '_blank',
        },
      }
    }
  },
}

const styles = ['BOLD', 'ITALIC', 'UNDERLINE']

const Buttons = ({ state, setState, onChange }) => (
  <div className="text-editor-toolbar">
    {styles.map((style) => (
      <StyleButton
        key={style}
        style={style}
        state={state}
        setState={setState}
        onChange={onChange}
      />
    ))}
    <URLButton state={state} setState={setState} />
  </div>
)

const StyleButton = ({ style, state, setState, onChange }) => (
  <button
    className={`draftBtn ${style.toLowerCase()}`}
    name={style}
    onClick={(e) => {
      e.preventDefault()
      onChange(RichUtils.toggleInlineStyle(state.editorState, e.target.name))
    }}
  >
    {style.slice(0, 1)}
  </button>
)

const URLButton = ({ state, setState }) => (
  <button
    className="draftBtn url"
    onClick={(e) => {
      e.preventDefault()
      promptForLink(state, setState, e)
    }}
  >
    <Hypertext />
  </button>
)

const Hypertext = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130">
    <path
      className="icon-hypertext"
      d="M59.37 34.17L70 23.53a26 26 0 0136.76 36.76L96.12 70.92M70.63 
      96.41L60 107a26 26 0 01-36.76-36.71l10.64-10.63M85.5 44.79l-41 41"
    />
  </svg>
)

const URLInput = ({ state, setState }) => {
  const [input, setInput] = useState(null)

  useEffect(() => {
    if (!input) return
    input.focus()
  }, [input])

  useEffect(() => {
    if (!input) return
    if (document.activeElement !== input) {
      setState({ ...state, showURLInput: false })
    }
  })

  if (!state.showURLInput) return null

  return (
    <div className="editor-url-input">
      <input
        ref={setInput}
        type="text"
        placeholder="Insérer l'URL..."
        value={state.urlValue}
        onChange={(e) => setState({ ...state, urlValue: e.target.value })}
      />
      <button onClick={(e) => confirmLink(state, setState, e)}>OK</button>
      <button onClick={(e) => removeLink(state, setState, e)}>✕</button>
    </div>
  )
}

const EditorLink = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData()
  return (
    <a className="editor-link" href={url}>
      {props.children}
    </a>
  )
}

const promptForLink = (state, setState, e) => {
  e.preventDefault()
  const { editorState } = state
  const selection = editorState.getSelection()
  if (!selection.isCollapsed()) {
    const contentState = editorState.getCurrentContent()
    const startKey = editorState.getSelection().getStartKey()
    const startOffset = editorState.getSelection().getStartOffset()
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey)
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset)

    let url = ''
    if (linkKey) {
      const linkInstance = contentState.getEntity(linkKey)
      url = linkInstance.getData().url
    }

    setState({
      ...state,
      showURLInput: true,
      urlValue: url,
    })
  }
}

const confirmLink = (state, setState, e) => {
  e.preventDefault()
  const { editorState, urlValue } = state
  const contentState = editorState.getCurrentContent()
  const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
    url: urlValue,
  })
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  })
  setState({
    ...state,
    editorState: RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey,
    ),
    showURLInput: false,
    urlValue: '',
  })
}

const removeLink = (state, setState, e) => {
  e.preventDefault()
  const selection = state.editorState.getSelection()
  if (!selection.isCollapsed()) {
    setState({
      ...state,
      urlValue: '',
      showURLInput: false,
      editorState: RichUtils.toggleLink(state.editorState, selection, null),
    })
  }
}

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    )
  }, callback)
}
