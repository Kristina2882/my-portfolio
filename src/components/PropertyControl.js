import React, {useEffect, useState} from "react";
import NewPropertyForm from "./NewPropertyForm";
import PropertyList from "./PropertyList";
import EditPropertyForm from "./EditPropertyForm";
import PropertyDetail from "./PropertyDetail";
import {db, auth} from './../firebase';
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore";
import SignIn from "./SignIn";
import UserProfile from "./UserProfile";
import SignOut from "./SignOut";

function PropertyControl() {
    const [formVisible, setFormVisible] = useState(false);
    const [mainPropertyList, setMainPropertyList] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);
    const [mainUserList, setMainUserList] = useState([]);
    const [userProfileVisible, setUserProfileVisible] = useState(true);


useEffect(() => {
  const unSubscribe = onSnapshot(
    collection(db, "properties"),
    (collectionSnapshot) => {
    const properties = [];
    collectionSnapshot.forEach((doc) => {
    properties.push({
      name: doc.data().name,
      id: doc.id
    });
    });
    setMainPropertyList(properties);
    },
    (error) => {
    setError(error.message);
    }
  );
  return () => unSubscribe;

},[]);

useEffect(() => {
  const unSubscribe = onSnapshot(
    collection(db, "users"),
    (collectionSnapshot) => {
      const users = [];
      collectionSnapshot.forEach((user) =>{
        users.push({
         username: user.data().username,
         property1: user.data().property1,
         property2: user.data().property2,
         property3: user.data().property3,
         id: user.id
        });
      } );
      setMainUserList(users);
    },
    (error) => {
      setError(error.message);
    }
  );
  return () => unSubscribe;
}, []);

const handleClick = () => {
    if (selectedProperty != null) {
        setFormVisible(false);  
        setSelectedProperty(null);
    }
        else {
         setFormVisible(!formVisible)
        }
}

const handleDeletingProperty = async(id) => {
    const propertyToDelete = doc(db, "properties", id);
    deleteDoc(propertyToDelete);
    setSelectedProperty(null);
  }

  const handleEditClick = () => {
   setEditing(true);
  }

  const handleEditingPropertyInList = async (propertyToEdit) => {
    const propertyRef = doc(db, "properties", propertyToEdit.id);
    await updateDoc(propertyRef, propertyToEdit);
    setSelectedProperty(null);
    setEditing(false);
  }

  const handleAddingNewPropertyToList = async (newProperty) => {
    await addDoc(collection(db, "properties"), newProperty);
    setFormVisible(false);
  }

  const handleChangingSelectedProperty = (id) => {
   const selection = mainPropertyList.filter(property => property.id === id)[0];
   setSelectedProperty(selection);
  }

  const handleSignUp = async (newUser) => {
   await addDoc(collection(db, "users"), newUser);
   setUserProfileVisible(true);
  }
  
  const handleSignOut = () => {
    setUserProfileVisible(false);
  }

  const handleSignInClick = () => {
    setUserProfileVisible(true);
  }

    if (auth.currentUser === null) {
      return (
        <React.Fragment>
      <h2>Please sign in to proceed!</h2>
      <SignIn onClickSignUp={handleSignUp} onClickSignIn={handleSignInClick} propList = {mainPropertyList} />
        </React.Fragment>
      );
    }

    else if (auth.currentUser.email !== "admin@com.tt") {
      return (
        <React.Fragment>
        <UserProfile userList={mainUserList} userName={auth.currentUser.email} propArray={mainPropertyList} />
        <SignOut onClickSignOut = {handleSignOut}/>
        </React.Fragment>
      );
    }

     
    else if (auth.currentUser.email === "admin@com.tt") {
      let currectlyVisible;
      let buttonText;

    if(error) {
    currectlyVisible = <h5>There was an error: {error}.</h5>
    }
    else if (editing ) {      
        currectlyVisible=<EditPropertyForm property={selectedProperty} onPropEditing={handleEditingPropertyInList}/>
        buttonText="To List";
      } else if (selectedProperty != null) {
       currectlyVisible = <PropertyDetail property={selectedProperty} onPropDelete={handleDeletingProperty} onPropEdit = {handleEditClick}/>
       buttonText="To List";
      } else if (formVisible) {
        currectlyVisible = <NewPropertyForm onCreatingNewProperty= {handleAddingNewPropertyToList}/>
        buttonText="To List";
      } else {
        currectlyVisible= <PropertyList mainPropList={mainPropertyList} onPropertySelection={handleChangingSelectedProperty}/>
        buttonText="+ Add";
      }

  return (
    <React.Fragment>
        {currectlyVisible}
       {error ? null: <button onClick={handleClick}>{buttonText}</button>} 
       <SignOut onClickSignOut = {handleSignOut}/>
    </React.Fragment>
  );
}
}

export default PropertyControl;