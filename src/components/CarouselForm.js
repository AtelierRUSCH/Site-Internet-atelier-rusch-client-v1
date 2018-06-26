import React from 'react'
import store from '../store'

const CarouselForm = () => {
  const state = store.getState()

  const handleChange = event => {
    store.dispatch({
      type: 'FORM_INPUT_CAROUSEL_CHANGED',
      formId: 'EDIT_CAROUSEL',
      inputName: event.target.name,
      inputValue: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    const state = store.getState()
    const newSlide = state.carouselform.forms['EDIT_CAROUSEL']

    fetch('http://localhost:3456/homepage', { method: 'post',
      body: JSON.stringify(newSlide),
      headers: {
        'Content-Type': 'application/json'
      } })
  }

  const form = state.carouselform.forms['EDIT_CAROUSEL']

  return (
    <form onSubmit={handleSubmit}>
      <h3>Légende</h3>
      <input type="text" name="legend" value={form.legend} onChange={handleChange} />
      <h3>URL de l'image</h3>
      <textarea type="text" name="image" value={form.image} onChange={handleChange}>
      </textarea>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default CarouselForm
