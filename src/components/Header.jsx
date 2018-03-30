import React from 'react';
import PropTypes from 'prop-types';
import logo from '../img/logo-header-liten.png';

function Header(props) {
  return (
    <div>
      <nav>
        <a
          href="https://infotjenester.no"
        ><img src={logo} alt="" />
        </a>
        <input
          type="text"
          placeholder="Søk"
          aria-label="søk"
          value={props.search}
          onChange={props.updateSearch}
        />
      </nav>
    </div>
  );
}

Header.propTypes = {
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
};

export default Header;
