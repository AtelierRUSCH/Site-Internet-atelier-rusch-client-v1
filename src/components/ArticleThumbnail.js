import React from 'react'
import './css/ArticleThumbnail.css'
import { Link } from '@reach/router'

const ArticleThumbnail = ({ article, index }) => {
  const articleId = String(article.id)
  const articleSection = String(article.section)
  const scrollTop = () => {
    const numberRegex = /\d/g
    const isArticlePage = numberRegex.test(window.location.pathname)
    if (isArticlePage || window.location.pathname === '/') {
      document.getElementById('scrollToTop').scrollIntoView()
    }
  }

  return (
    <Link to={`/${articleSection}/${articleId}`} onClick={() => scrollTop()}>
      <div
        className="ArticleThumbnailClassic"
        style={
          article.hasImage === '1'
            ? {
                zIndex: index,
                background: `center / cover no-repeat url("${
                  article.headerImage
                }"), rgba(0, 0, 0, 0.5)`
              }
            : { zIndex: index }
        }
      >
        <div
          className={
            article.hasImage === '1' && window.location.pathname !== '/'
              ? 'ArticleThumbnailFilterBlack ArticleThumbnailHasImage'
              : 'ArticleThumbnailClassic'
          }
        >
          <h6>{article.tags.join(' - ')}</h6>
          <h5>{article.title}</h5>
          {article.section === 'projets' ? (
            <React.Fragment>
              <h6
                style={{
                  marginLeft: '2rem',
                  marginRight: '2rem',
                  lineHeight: '1.2rem'
                }}
              >
                {article.client}
                <div style={{ height: '0.4rem' }} />
                {article.place}
              </h6>
            </React.Fragment>
          ) : (
            <h6>{`${article.date.slice(-2)}.${article.date.slice(
              5,
              7
            )}.${article.date.slice(0, 4)}`}</h6>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ArticleThumbnail
