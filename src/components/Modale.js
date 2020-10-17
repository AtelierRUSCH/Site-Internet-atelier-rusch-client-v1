import React from 'react'
import './css/Modale.css'
import { Link, navigate } from '@reach/router'
import store from '../store.js'
import Partenaire from './Partenaire.js'
import { LayoutRender } from './Layout.js'
import ArticleThumbnail from './ArticleThumbnail.js'
import RedirectingBlockToAllArticles from './RedirectingBlockToAllArticles.js'
import ReactHtmlParser from 'react-html-parser'

const generateValidUrl = (value) => {
  // for vimeo videos
  if (value.includes('vimeo')) {
    const vimeoId = value.split('/').slice(-1)
    return `https://player.vimeo.com/video/${vimeoId}?color=fbd052`
  }
  // for youtube videos
  if (value.includes('&')) {
    const splitUrl = value.split('&').slice()
    const validUrl = splitUrl[0].replace('watch?v=', 'embed/')
    return validUrl
  } else if (value.includes('watch?v=')) {
    return value.replace('watch?v=', 'embed/')
  } else if (value.includes('youtu.be')) {
    return value.replace('youtu.be', 'youtube.com/embed')
  } else if (!value.includes('youtube')) {
    return `https://youtube.com/embed/${value}`
  }
  return value
}

const toHTML = {
  h2: ({ value }) => <h4>{value}</h4>,
  p: ({ value }) => (
    <div style={{ alignSelf: 'flex-start' }}>{ReactHtmlParser(value)}</div>
  ),
  blockquote: ({ value }) => <blockquote className="quote">{value}</blockquote>,
  caption: ({ value }) => <p className="caption">{value}</p>,
  abstract: ({ value }) => <p className="abstract">{value}</p>,
  imgs: ({ value }) =>
    value.split(',').map((url, i) => <img key={i} src={url} alt="" />),
  video: ({ value }) =>
    value
      .split(',')
      .map((videoValue, i) => (
        <iframe
          title={`video-${i}`}
          key={i}
          src={generateValidUrl(videoValue)}
          allowFullScreen="allowfullscreen"
          alt=""
          frameBorder="0"
        />
      )),
  composition: ({ value }) => (
    <LayoutRender
      layoutWidth="50vw"
      images={value.images}
      justification={value.justification}
      borders={value.borders}
      margins={value.margins}
    />
  ),
}

const Element = ({ element }) => toHTML[element.type](element)

const Modale = ({ article, setFullScreen }) => {
  let treatedContent = ''

  if (typeof article.content === 'string') {
    treatedContent = JSON.parse(article.content)
  } else {
    treatedContent = article.content
  }

  const content = treatedContent.map((element, i) => (
    <Element key={i} element={element} />
  ))

  const parentContextPath = window.location.pathname.replace(/\/\d+$/, '')

  document.addEventListener('keydown', function (e) {
    let keyCode = e.keyCode
    if (keyCode === 27) {
      setFullScreen ? setFullScreen() : navigate(parentContextPath)
    }
  })

  const state = store.getState()

  const articles = state.articles.allArticles

  const getSection = parentContextPath.slice(1, parentContextPath.length)

  const articleSuggestedChosen = articles.find(
    (a) => a.id === article.suggestion,
  )

  const articlesSuggested = articles
    .filter((a) => a.id !== article.id)
    .filter((a) => a.isDraft === '0')
    .filter((a) => a.section === getSection)

  const articleSuggestions = articleSuggestedChosen
    ? [articleSuggestedChosen, ...articlesSuggested.slice(0, 1)]
    : articlesSuggested.slice(0, 2)

  const getPartners = (array) =>
    state.partners.allPartners.filter(
      (el) => el.name === array.find((elem) => elem === el.name),
    )

  const partners = getPartners(article.partners).map((partner) => (
    <Partenaire key={partner.id} partner={partner} />
  ))

  const articlesSuggestions = (
    <div className="ArticlesBlock">
      <div className="articleSuggestion">
        <h4>Ceci pourrait aussi vous intéresser :</h4>
      </div>
      {articleSuggestions.map((article, index) => (
        <ArticleThumbnail
          key={article.id}
          article={article}
          index={index}
          className="ArticleThumbnailClassic"
        />
      ))}
      <RedirectingBlockToAllArticles section={getSection} />
    </div>
  )

  const projectLink = (
    <a href={article.projectLink} target="_blank" rel="noopener noreferrer">
      <div className="smallLink">Lien du projet</div>
    </a>
  )

  return (
    <div id="scrollToTop">
      {!setFullScreen && (
        <Link className="closeModaleBtn" to={parentContextPath}>
          <div className="closeModaleBtn">✕</div>
        </Link>
      )}
      <div
        className="ModalePic"
        style={{
          background: `center / cover no-repeat url(${article.headerImage})`,
        }}
      >
        <div className="ModaleHeader FilterBlack">
          <h2 className="green">{article.title}</h2>
          <h3 style={{ marginTop: '1.15rem' }}>{article.shortDescription}</h3>
          {article.projectLink === '' ? '' : projectLink}
        </div>
      </div>
      <div className="contentBlock">
        <div className="recapBlockFixed">
          <h6 className="recapBlockTitle">{article.title}</h6>
          <h6>{article.shortDescription}</h6>
          {article.client && (
            <h6 style={{ marginTop: '1rem' }}>
              <u>Client</u> : {article.client}
            </h6>
          )}
          <h6 style={{ marginTop: '1rem' }}>
            <u>Date</u> : {article.date}
          </h6>
          {article.place && (
            <h6 style={{ marginTop: '1rem' }}>
              <u>Lieu</u> : {article.place}
            </h6>
          )}
          {article.district && (
            <h6 style={{ marginTop: '1rem' }}>
              <u>Quartier</u> : {article.district}
            </h6>
          )}
          {article.type && (
            <h6 style={{ marginTop: '1rem' }}>
              <u>Type</u> : {article.type}
            </h6>
          )}
        </div>
        <div className="content">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            className="textContent"
          >
            {content}
          </div>
          {article.partners.length !== 0 && (
            <h4>Nos partenaires sur ce projet :</h4>
          )}
          {partners && <div className="PartenairesContainer">{partners}</div>}
          {!window.location.pathname.includes('admin') && articlesSuggestions}
        </div>
      </div>
    </div>
  )
}

export default Modale
