import React, { useState } from "react";
import {auth} from './../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import PropTypes from 'prop-types';

function SignIn(props) {

 const [signInSuccess, setSignInSuccess] = useState(null);
 const [signUpSuccess, setSignUpSuccess] = useState(null);

 function doSignIn(event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    setSignInSuccess(`You've signed in successfully as ${userCredential.user.email}!`);
    props.onClickSignIn();
    
  })
  .catch((error) => {
    setSignInSuccess(`There were problems when sign in: ${error.message}`);
  });
 
 }

 function doSignUp(event) {
  event.preventDefault();

  const email = event.target.emailSignUp.value;
  const password = event.target.passwordSignUp.value;
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  setSignUpSuccess(`You've signed up successfully as ${userCredential.user.email}!`);
  props.onClickSignUp({
    username: email,
    property1: event.target.property1.value,
    property2: event.target.property2.value,
    property3: event.target.property3.value
    });
  })
  .catch((error) => {
    setSignInSuccess(`There were problems when sign up: ${error.message}`);

  })

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

            <h2>Create profile</h2>
            <h3><em>{signUpSuccess}</em></h3>
            <form onSubmit={doSignUp}>
                <input
                type="text"
                name="emailSignUp"
                placeholder="Enter email"/>
                <input
                type="password"
                name="passwordSignUp"
                placeholder="Enter password"/>
                <br/><hr/>
                <label>{props.propList[0].name}</label> 
                <input
                type="property1"
                name="property1"
                />
                <br/> <br/>
                <label>{props.propList[1].name}</label> 
                 <input
                type="property2"
                name="property2"
                />
                <br/> <br/>
                <label>{props.propList[2].name}</label> 
                 <input
                type="property3"
                name="property3"
                />
                <br/><br/>
                <button type="submit">Create profile!</button>
            </form>
        </React.Fragment>

    );
}

SignIn.propTypes = {
  onClickSignUp: PropTypes.func,
  onClickSignIn: PropTypes.func,
  propList: PropTypes.array
}

export default SignIn;
