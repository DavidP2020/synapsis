import React, { useState } from "react";
import Link from "next/link";
function Header() {
  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-items">
          <Link href="" className="navbar-title">
            Blog Synapsis
          </Link>
          <button
            className="lg:hidden inline-flex items-center justify-center border h-10 w-10 rounded-md outline-none focus:outline-none ml-auto"
            onClick={() => setNavbar(!navbar)}
          >
            {navbar ? (
              <i className="fas fa-close"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </button>
          <div
            className={`lg:inline-flex lg:w-auto-mt-2 lg:mt-0 lg:w-auto w-full ${
              navbar ? "" : "hidden"
            }`}
          >
            <ul className="navbar-menu">
              <li>
                <Link href="/" className="navbar-links">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/User/user" className="navbar-links">
                  User
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
