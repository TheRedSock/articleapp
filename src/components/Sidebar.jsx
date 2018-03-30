import React from 'react';

function Sidebar() {
  return (
    <div>
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="/">Tilbake til topp</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
