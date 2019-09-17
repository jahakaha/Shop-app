import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
const SignedInLinks = (props) => {
    return null;
    return(
        <div className="signedIn">
            <li><NavLink to = "/create">Add New Product</NavLink></li>
            <li><NavLink to = "/">Log Out</NavLink></li>     
       </div>
    )
}

export default SignedInLinks;