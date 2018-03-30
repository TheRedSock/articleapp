import React from 'react';
import PropTypes from 'prop-types';
import 'datejs';

const imageStyle = {
  width: 'auto',
  height: '210px',
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Article(props) {
  const propDate = new Date(props.date);
  const dateStr = propDate.toString('dd.MM.yyyy');
  const ucTag = capitalizeFirstLetter(props.tag);

  return (
    <div className="article-card-container">
      <div className="article-card">
        <a
          className="article-tag"
          onClick={props.filterTags}
          href="#root"
        >
          {ucTag}
        </a>
        <a href={props.url} target="_blank" className="article-title"><h1>{props.title}</h1></a>
        <a
          href="#root"
          onClick={props.sortDate}
          onKeyPress={props.sortDate}
          className="article-date"
        >
          {dateStr}
        </a>
        <p>{props.ingress}</p>
        <a href={props.url} className="btn" target="_blank">Les mer...</a>
      </div>
      <img src={props.image} alt="" style={imageStyle} className="article-image" />
    </div>
  );
}

Article.propTypes = {
  date: PropTypes.string.isRequired,
  filterTags: PropTypes.func.isRequired,
  sortDate: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingress: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Article;
