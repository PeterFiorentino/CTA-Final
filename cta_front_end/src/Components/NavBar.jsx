import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav>
            <strong><p>Binge</p></strong>
            <Link to="/" >Home</Link>
            <Link to="/users" >Users</Link>
            <Link to="/shows" >Shows</Link>
            <Link to="/about" >About</Link>
        </nav>
    )
}

export default NavBar;

