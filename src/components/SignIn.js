import React, { useState } from "react";
import {auth} from './../firebase';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

function SignIn() {
 const [signInSuccess, setSignInSuccess] = useState(null);
 const [signOutSuccess, setSignOutSuccess] = useState(null);

 function doSignIn(event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    setSignInSuccess(`You've signed in successfully as ${userCredential.user.email}!`);
  })
  .catch((error) => {
    setSignInSuccess(`There were problems when sign in: ${error.message}`);
  });
 }

 function doSignOut() {
    signOut(auth)
    .then(function() {
        setSignOutSuccess("You've signed out successfully! See you:))");
    })
    .catch(function(error) {
      setSignOutSuccess(`There was an error while sign out: ${error.message}`);
    });
 }
    return (
        <React.Fragment>
            <h2>Sign In</h2>
            <h3><em>{signInSuccess}</em></h3>
            <form onSubmit={doSignIn}>
                <input
                type="text"
                name="email"
                placeholder="Enter email"/>
                <input
                type="password"
                name="password"
                placeholder="Enter password"/>
                <button type="submit">Sign in!</button>
            </form>

            <h2>Sign Out</h2>
            <h3><em>{signOutSuccess}</em></h3>
            <button onClick={doSignOut}>Sign Out!</button>
        </React.Fragment>

    );
}

export default SignIn;
