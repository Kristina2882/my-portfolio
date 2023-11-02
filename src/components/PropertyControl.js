import React, {useEffect, useState} from "react";
import NewPropertyForm from "./NewPropertyForm";
import PropertyList from "./PropertyList";
import EditPropertyForm from "./EditPropertyForm";
import PropertyDetail from "./PropertyDetail";
import {db, auth} from './../firebase';
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore";
import UserProfile from "./UserProfile";
import EditUserForm from "./EditUserForm";

function PropertyControl() {
    const [formVisible, setFormVisible] = useState(false);
    const [mainPropertyList, setMainPropertyList] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);
    const [editUser, setEditUser] = useState(false);

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

  const handleEditUserClick = () => {
    setEditUser(true);
  }

    if (auth.currentUser === null) {
      return (
        <React.Fragment>
      <h2>Please sign in to proceed!</h2>
        </React.Fragment>
      );
    }

    else if (auth.currentUser.email !== "admin@com.tt") {
      let currectlyVisible;

      if (editUser) {
        currectlyVisible = <EditUserForm/>
      }
      else {
        currectlyVisible =  <UserProfile listForUsers = {mainPropertyList} userProfile={auth.currentUser.email} onClickEdit={handleEditUserClick}/>
      }

      return (
        <React.Fragment>
       {currectlyVisible}
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
    </React.Fragment>
  );
}
}

export default PropertyControl;