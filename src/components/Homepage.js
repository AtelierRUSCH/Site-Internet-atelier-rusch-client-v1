import React from 'react'
import { Link } from '@reach/router'
import RedirectingBlockToAllArticles from './RedirectingBlockToAllArticles.js'
import ArticleThumbnail from './ArticleThumbnail.js'
import Modale from './Modale.js'
import './css/Homepage.css'
import LogoAnim from './img/rusch-anim.gif'
import store from '../store.js'
import { SlideShow } from './Carousel.js'
import Nav from './Nav.js'

const Homepage = (props) => {
  const state = store.getState()

  const labArticles = state.articles.allArticles
    .filter(article => article.section === 'lab')
    .filter(article => article.isDraft === '0')
    .filter(article => article.hasStar === '1')

  const articleThumbnails = labArticles
    .slice(labArticles.length - 3, labArticles.length)
    .map((article, index) => <ArticleThumbnail key={article.id} article={article} index={index} className="ArticleThumbnailClassic" />)

  const slideshowArticles = state.articles.allArticles
    .filter(article => article.section === 'projets')
    .filter(article => article.isDraft === '0')
    .filter(article => article.hasStar === '1')
    .slice(0, 3)

  const articleId = props.articleId

  const selectedArticle = state.articles.allArticles.find(article => String(article.id) === articleId)
  const modale = selectedArticle !== undefined
    ? <div className='ModaleBlock'><Modale article={selectedArticle} displayModale={'block'} /></div>
    : ''

  document.body.style.overflow = selectedArticle !== undefined ? 'hidden hidden' : 'hidden scroll'

  return (
    <div>
      <Nav />
      {document.body.clientWidth > 980 ? '' : <div className="spacer"></div>}
      <div className="IntroBlocks">

        <div className="IntroBlockLeft">
          <div className="LogoBlock">
            <img className="LogoImg" src={LogoAnim} alt="logo Rusch" />
          </div>

          <div className="CarrouselBlock">
            <SlideShow articles={slideshowArticles} />
          </div>

        </div>

        <div className="IntroBlockRight">
          <h1 style={{ marginTop: '2rem' }}>
            <span className="green">L’Atelier Rusch</span> propose des méthodes créatives pour organiser la pensée collective et co-concevoir de nouveaux services pour les collectivités et les entreprises.
            <br/>
            <Link to='/atelier'><span className="green">→  <span className="green bigLink">La suite !</span></span></Link>
          </h1>
        </div>

      </div>

      <div className="ArticlesBlock">
        {articleThumbnails}
        <RedirectingBlockToAllArticles section='lab'/>
      </div>
      {modale}

    </div>
  )
}

export default Homepage
