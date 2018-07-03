import React from 'react'
import Nav from './Nav.js'
import ArticleThumbnail from './ArticleThumbnail.js'
import FiltersSection from './FiltersSection.js'
import Modale from './Modale.js'
import SectionTitleBlock from './SectionTitleBlock.js'
import ButtonCreateArticle from './ButtonCreateArticle'
import store from '../store.js'
import { getActiveFilters, applyFiltersToSection } from './FilteringFunctions.js'

const determineClassName = article => article.hasStar === 'true'
  ? 'ArticleThumbnailClassic ArticleThumbnailHasStar FilterBlack'
  : 'ArticleThumbnailClassic'

const LabRusch = (props) => {
  const state = store.getState()
  const articles = state.articles.allArticles
  const articleId = props.articleId
  const selectedArticle = articles.find(article => String(article.id) === articleId)
  const modale = selectedArticle !== undefined
    ? <Modale article={selectedArticle} displayModale={'block'} />
    : ''

  const getFilteredArticles = applyFiltersToSection('Lab', state)

  const filteredLabArticleThumbnails = getFilteredArticles
    .map((article, index) =>
      <ArticleThumbnail
        key={article.id}
        article={article}
        index={index}
        className={determineClassName(article)}/>)

  return (
    <div>
      <Nav />
      <div className="spacer"></div>
      <FiltersSection />

      <div className="ArticlesBlock">
        <SectionTitleBlock message="Plein d'articles super intéressants sur des sujets super intéressants" />
        { filteredLabArticleThumbnails }
      </div>

      {modale}

    </div>
  )
}

export default LabRusch
