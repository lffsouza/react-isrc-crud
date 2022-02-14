import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/users" className="nav-item nav-link">Users</NavLink>
                <NavLink to="/associacoes" className="nav-item nav-link">Associação</NavLink>
                <NavLink to="/obras" className="nav-item nav-link">Obra</NavLink>
                <NavLink to="/fonogramas" className="nav-item nav-link">Fonograma</NavLink>
            </div>
        </nav>
    );
}

export { Nav };