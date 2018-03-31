import React from 'react';
import PropTypes from 'prop-types';
import logo from '../img/logo-header-liten.png';
import searchIcon from '../img/search-icon.png';

function Header(props) {
  return (
    <header>
      <nav className="main-nav">
        <a
          href="https://infotjenester.no"
          target="_blank"
          rel="noopener noreferrer"
        ><img src={logo} alt="" className="animated slideInLeft" />
        </a>
        <div className="input-container">
          <img src={searchIcon} alt="" className="animated flipInX" />
          <input
            className="animated flipInX"
            type="text"
            placeholder="Søk"
            aria-label="søk"
            value={props.search}
            onChange={props.updateSearch}
          />
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
};

export default Header;
