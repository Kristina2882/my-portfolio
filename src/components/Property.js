import React from "react";
import PropTypes from 'prop-types';

function Property(props) {
    return (
        <React.Fragment>
            <h2>{props.name}</h2>
            <button onClick={props.onPropEdit}>Update</button> <button onClick={props.onPropDelete}>Delete</button>
        </React.Fragment>
    );
}

Property.propTypes = {
    name: PropTypes.string,
    onPropDelete: PropTypes.func,
    onPropEdit: PropTypes.func
}

export default Property;