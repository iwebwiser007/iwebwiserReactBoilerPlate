import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link
                        to="/"
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                        aria-current={location.pathname === '/' ? 'page' : undefined}
                    >
                        TODO
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/redux"
                        className={`nav-link ${location.pathname === '/redux' ? 'active' : ''}`}
                        aria-current={location.pathname === '/redux' ? 'page' : undefined}
                    >
                        TODO+Redux
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/http"
                        className={`nav-link ${location.pathname === '/http' ? 'active' : ''}`}
                        aria-current={location.pathname === '/http' ? 'page' : undefined}
                    >
                        TODO+HTTP
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;
