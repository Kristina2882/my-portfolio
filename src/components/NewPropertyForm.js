import React from "react";
import ReusableForm from "./ReusableForm";
import {v4} from 'uuid';
import PropTypes from 'prop-types';

function NewPropertyForm(props) {

   function handleNewPropertyFormSubmission(event) {
        event.preventDefault();
        props.onCreatingNewProperty({
        name: event.target.name.value,
        id: v4()
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