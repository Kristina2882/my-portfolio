import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from 'prop-types';

function NewPropertyForm(props) {

   function handleNewPropertyFormSubmission(event) {
        event.preventDefault();
        props.onCreatingNewProperty({
        name: event.target.name.value
        });

    }
    return (
        <React.Fragment>
            <ReusableForm
            handleFormSubmission={handleNewPropertyFormSubmission}
            buttonText="Save"
            />
        </React.Fragment>
    );
}

NewPropertyForm.propTypes = {
    onCreatingNewProperty: PropTypes.func
}

export default NewPropertyForm;