import React from 'react';
import PropTypes from 'prop-types';
import './Title.css';

function Title(props) {
  return (
    <div className="row w-100">
      <h1 className="h2 col-sm-8">{props.title}</h1>
      <a
        href="#root"
        className={props.buttonClass}
        onClick={props.removeFilter}
        onKeyUp={props.removeFilter}
      >
        {props.filterButtonText}
      </a>
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  removeFilter: PropTypes.func.isRequired,
  filterButtonText: PropTypes.string.isRequired,
};

export default Title;
