import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return(
        <div className = "signedOutLinks">
            <li><NavLink to='/signup'>SignUp</NavLink></li>
            <li><NavLink to='/signin'>Login</NavLink></li>
        </div>
    );
}
export default SignedOutLinks;  