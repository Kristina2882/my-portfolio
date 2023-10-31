import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from 'prop-types';

function EditPropertyForm(props) {
    const {property} = props;

    function handleEditFormSubmission(event) {
        event.preventDefault();
        props.onPropEditing({
         name: event.target.name.value,
         id: property.id
        });
    }
    return (
        <React.Fragment>
            <ReusableForm
            handleFormSubmission={handleEditFormSubmission}
            buttonText="Save changes"/>
        </React.Fragment>
    );
}

EditPropertyForm.propTypes = {
    onPropEditing: PropTypes.func,
    property: PropTypes.object
}

export default EditPropertyForm;