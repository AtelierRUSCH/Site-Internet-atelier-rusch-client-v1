import React from 'react'
import { Link } from '@reach/router'
import api from '../api.js'
import IoAndroidDelete from 'react-icons/lib/io/android-delete'
import IoEdit from 'react-icons/lib/io/edit'
import IoIosImage from 'react-icons/lib/io/image'
import MdAdd from 'react-icons/lib/md/add-circle-outline'

const ArticleCard = ({ article }) => {
  const day = article.date.slice(-2)
  const month = article.date.slice(5, 7)
  const year = article.date.slice(0, 4)
  const trimDash = string =>
    string.includes('-') ? `0${string.replace('-', '')}` : string
  return (
    <div className="AdminCardFullWidth">
      <div className="currentText" style={{ width: '40vw' }}>
        {article.title}
      </div>
      <div className="EditButtonsContainer">
        <h6>{`${trimDash(day)}.${trimDash(month)}.${year}`}</h6>
        <button>
          <IoIosImage
            className={
              article.hasImage === '1'
                ? 'ReactIconPic'
                : 'ReactIconPic inactive'
            }
          />
        </button>
        <button
          className={
            article.hasStar === '1' ? 'star hasStar' : 'star hasNoStar'
          }
        >
          ★
        </button>
        <Link
          to={String(article.id)}
          onClick={() => document.getElementById('box').scrollIntoView()}
        >
          <button className="ReactIcon">
            <IoEdit />
          </button>
        </Link>
        <button
          className="ReactIcon"
          onClick={() => {
            if (
              window.confirm('La suppression est irréversible. Pas de regrets?')
            ) {
              api.deleteArticle(article.id).then(() => window.location.reload())
            } else {
            }
          }}
        >
          <IoAndroidDelete />
        </button>
      </div>
    </div>
  )
}

const AdminArticles = ({ articles }) => {
  const projetsArticlesList = articles
    .filter(article => article.section === 'projets')
    .filter(article => article.isDraft === '0')
    .map(article => <ArticleCard key={article.id} article={article} />)

  const labArticlesList = articles
    .filter(article => article.section === 'lab')
    .filter(article => article.isDraft === '0')
    .map(article => <ArticleCard key={article.id} article={article} />)

  const draftArticlesList = articles
    .filter(article => article.isDraft === '1')
    .map(article => <ArticleCard key={article.id} article={article} />)

  const draftTitle = (
    <div className="AdminTitles yellow">Brouillons enregistrés :</div>
  )

  return (
    <div className="GlobalContainer">
      <Link to="new" onClick={() => window.scrollTo(0, 0)}>
        <div className="ButtonCreateElement">
          <MdAdd className="ReactIconAdd" />
          Créer un nouvel article
        </div>
      </Link>
      {draftArticlesList.length === 0 ? '' : draftTitle}
      {draftArticlesList}
      <br />
      <div className="AdminTitles yellow">Articles de la section Projets :</div>
      {projetsArticlesList}
      <br />
      <div className="AdminTitles yellow">
        Articles de la section LabRusch :
      </div>
      {labArticlesList}
    </div>
  )
}

export default AdminArticles
