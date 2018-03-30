import React from 'react';
import PropTypes from 'prop-types';

function Title(props) {
  return (
    <div className="title-container">
      <h1>{props.title}</h1>
      <a
        href="#root"
        className={props.buttonClass}
        onClick={props.removeFilter}
        onKeyPress={props.removeFilter}
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
