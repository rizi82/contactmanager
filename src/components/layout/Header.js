import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = (props) => {
    const {title} = props;
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
            <div className="container">
                <a href="/" className="navbar-brand">{title}</a>
            </div>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <i className="fas fa-home">Home</i>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact/add" className="nav-link">
                        <i className="fas fa-plus ">Add</i>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">
                        <i className="fas fa-question">About</i>
                    </Link>
                </li>

            </ul>
        </nav>

    );
}

// define a default propsType
Header.defaultProps = {
    title: 'My App'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;