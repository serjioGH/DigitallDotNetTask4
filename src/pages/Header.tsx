import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

interface CustomNavLinkProps {
  to: string | string[];
  activeClassName: string;
  children: React.ReactNode;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, activeClassName, children }) => {
  const location = useLocation();

  // Define custom isActive function
  const isActive = (match: any, location: any) => {
    if (!match) {
      return false;
    }
    // Check if the current location matches any of the specified paths
    const paths = Array.isArray(to) ? to : [to];
    return paths.some(path => location.pathname.startsWith(path));
  };

  return (
    <NavLink to={Array.isArray(to) ? to.join(" ") : to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>
      {children}
    </NavLink>
  );
};

const Header = () => {
    return (
      <div>
       <div className="hero_area">

     
  {/* header section starts */}
  <header className="header_section">
    <nav className="navbar navbar-expand-lg custom_nav-container ">
      <a className="navbar-brand" href="index.html">
        <span>Cloth Management</span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ">
          <li className="nav-item">
            <NavLink to={`/home`} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>Home</NavLink>
          </li>
          {/* <span className="sr-only">(current)</span> */}
          <li className="nav-item">
            <NavLink to={`/`} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>Products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/contact`} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>Contact Us</NavLink>       
          </li>
          <li className="nav-item">
            <NavLink to={`/login`} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>
              <span>Login</span>
            </NavLink> 
          </li>
        </ul>
        <div className="user_option">

          <a href="">
            <i className="fa fa-shopping-bag" aria-hidden="true" />
          </a>
          {/* <form className="form-inline ">
            <button className="btn nav_search-btn" type="submit">
              <i className="fa fa-search" aria-hidden="true" />
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  </header>
  {/* end header section */}
  </div>
      </div>
    );
};

export default Header;