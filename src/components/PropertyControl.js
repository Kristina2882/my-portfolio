import React, {useState} from "react";
import NewPropertyForm from "./NewPropertyForm";
import PropertyList from "./PropertyList";
import EditPropertyForm from "./EditPropertyForm";
import PropertyDetail from "./PropertyDetail";

function PropertyControl() {
    const [formVisible, setFormVisible] = useState(false);
    const [mainPropertyList, setMainPropertyList] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [editing, setEditing] = useState(false);



const handleClick = () => {
    if (selectedProperty != null) {
        setFormVisible(false);  
        setSelectedProperty(null);
    }
        else {
         setFormVisible(!formVisible)
        }
}

const handleDeletingProperty = (id) => {
    const newMainPropertyList = mainPropertyList.filter(property => property.id !== id);
    setMainPropertyList(newMainPropertyList);
    setSelectedProperty(null);
  }

  const handleEditClick = () => {
   setEditing(true);
  }

  const handleEditingPropertyInList = (propertyToEdit) => {
    const newMainPropertyList = mainPropertyList.filter(property => property.id !== selectedProperty.id).concat(propertyToEdit);
    setMainPropertyList(newMainPropertyList);
    setSelectedProperty(null);
    setEditing(false);
  }

  const handleAddingNewPropertyToList = (newProperty) => {
    const newMainPropertyList = mainPropertyList.concat(newProperty);
    setMainPropertyList(newMainPropertyList);
    setFormVisible(false);
  }

  const handleChangingSelectedProperty = (id) => {
   const selection = mainPropertyList.filter(property => property.id === id)[0];
   setSelectedProperty(selection);
  }
    let currectlyVisible;
    let buttonText;

    if (editing ) {      
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
        <button onClick={handleClick}>{buttonText}</button>
    </React.Fragment>
  );
}

export default PropertyControl;