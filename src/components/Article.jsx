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
    <div className="row mb-4">
      <div className="col-md-12">
        <div className="card flex-md-row mb-4 box-shadow h-md-250">
          <div className="card-body d-flex flex-column align-items-start">
            <strong
              className="d-inline-block mb-2 text-primary"
              onClick={props.filterTags}
              onKeyUp={props.filterTags}
              role="link"
              tabIndex="0"
            >
              <a href="#root">{ucTag}</a>
            </strong>
            <h3 className="mb-0"><a href={props.url} className="text-dark" target="_blank">{props.title}</a></h3>
            <div className="mb-1 text-muted">{dateStr}</div>
            <p className="card-text mb-auto">{props.ingress}</p>
            <a href={props.url} target="_blank">Les mer...</a>
          </div>
          <img src={props.image} alt="" className="card-img-right d-none d-md-block img-fluid" style={imageStyle} />
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
