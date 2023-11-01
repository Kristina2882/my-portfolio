import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <React.Fragment>
         <h2>My Portfolio</h2>
        <Link to="/"><h2>Home</h2></Link> 
        <Link to="/sign-in"><h2>Sign In!</h2></Link>
        </React.Fragment>
      );  
}

export default Header;