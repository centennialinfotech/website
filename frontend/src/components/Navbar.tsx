import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { BASE_URL } from '../config/env'

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <div className="top-header"></div>
      <nav className="navbar navbar-expand-sm navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={`${BASE_URL}/img/logo.png`} alt="Centennial Infotech" />
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/" 
                  onClick={() => setIsOpen(false)}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/services" 
                  onClick={() => setIsOpen(false)}
                >
                  Solutions
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/blogs" 
                  onClick={() => setIsOpen(false)}
                >
                  Blogs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/client" 
                  onClick={() => setIsOpen(false)}
                >
                  Clients
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/aboutus" 
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </NavLink>
              </li>
              <div className="button">
                <NavLink 
                  className={({ isActive }) => `btn btn-link ${isActive ? 'active' : ''}`}
                  to="/contact" 
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </NavLink>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
