import React, {useState} from "react";
import {auth} from './../firebase';
import { signOut } from "firebase/auth";
import PropTypes from 'prop-types';

function SignOut(props) {
    const [signOutSuccess, setSignOutSuccess] = useState(null);

    function doSignOut() {
        signOut(auth)
        .then(function() {
            setSignOutSuccess("You've signed out successfully! See you:))");
            props.onClickSignOut();
        })
        .catch(function(error) {
          setSignOutSuccess(`There was an error while sign out: ${error.message}`);
        });

       
    }

    return (
        <React.Fragment>
            <h3><em>{signOutSuccess}</em></h3>
            <button onClick={doSignOut}>Sign Out!</button>
        </React.Fragment>
    );
}

SignOut.propTypes = {
    onClickSignOut: PropTypes.func
}
export default SignOut;