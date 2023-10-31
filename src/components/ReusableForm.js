import React from 'react';
import PropTypes from 'prop-types';

function ReusableForm(props) {
    return (
        <React.Fragment>
            <form onSubmit={props.handleFormSubmission}>
                <input
                name='name'
                type='text'
                placeholder='Enter property'
                />
                <button type='submit'>{props.buttonText}</button>
            </form>
        </React.Fragment>
    );
}

ReusableForm.propTypes = {
    handleFormSubmission: PropTypes.func,
    buttonText: PropTypes.string
}

export default ReusableForm;