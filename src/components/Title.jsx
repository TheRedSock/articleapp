import React from 'react';
import PropTypes from 'prop-types';

function Title(props) {
  return (
    <div className="title-container">
      <h1 className="animated fadeIn">{props.title}</h1>
      {props.hasFilter &&
        <a
          href="#root"
          className={props.buttonClass}
          onClick={props.removeFilter}
          onKeyPress={props.removeFilter}
        >
          Fjern Emnefilter
        </a>
      }
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  removeFilter: PropTypes.func.isRequired,
  hasFilter: PropTypes.bool.isRequired,
};

export default Title;
