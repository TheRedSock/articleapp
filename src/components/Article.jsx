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
    <div>
      <div>
        <div>
          <div>
            <strong
              onClick={props.filterTags}
              onKeyUp={props.filterTags}
              role="link"
              tabIndex="0"
            >
              <a href="#root">{ucTag}</a>
            </strong>
            <h3><a href={props.url} target="_blank">{props.title}</a></h3>
            <div>{dateStr}</div>
            <p>{props.ingress}</p>
            <a href={props.url} target="_blank">Les mer...</a>
          </div>
          <img src={props.image} alt="" style={imageStyle} />
        </div>
      </div>
    </div>
  );
}

Article.propTypes = {
  date: PropTypes.string.isRequired,
  filterTags: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingress: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Article;
