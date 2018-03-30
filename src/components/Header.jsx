import React from 'react';
import PropTypes from 'prop-types';
import logo from '../img/logo-header-liten.png';

function Header(props) {
  return (
    <div>
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a href="https://infotjenester.no" className="navbar-brand col-sm-3 col-md-2 mr-0"><img src={logo} alt="" className="img-fluid" /></a>
        <input type="text" className="form-control form-control-dark w-100" placeholder="Søk" aria-label="søk" value={props.search} onChange={props.updateSearch} />
      </nav>
    </div>
  );
}

Header.propTypes = {
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
};

export default Header;
