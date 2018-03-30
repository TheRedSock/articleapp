import React from 'react';
import PropTypes from 'prop-types';
import Article from './Article';

function ArticleList(props) {
  return (
    <div className="article-container">
      {/* Maps the content of the articles to components, sending the data as properties. */}
      {props.articles.map(a =>
        (<Article
          key={a.id}
          id={a.id}
          title={a.title}
          ingress={a.ingress}
          date={a.date}
          url={a.url}
          image={a.image}
          tag={a.tag}
          filterTags={props.filterTags}
          sortDate={props.sortDate}
        />))
      }
      {props.error.length > 0 && (
      <div>
        {props.error}
      </div>)}
      {props.articles.length === 0 && props.error.length === 0 && (
      <div>
        Ingen artikler som passer søket.
      </div>)}
    </div>
  );
}

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterTags: PropTypes.func.isRequired,
  sortDate: PropTypes.func.isRequired,
  error: PropTypes.string,
};

ArticleList.defaultProps = {
  error: '',
};

export default ArticleList;
