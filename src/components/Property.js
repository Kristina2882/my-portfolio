import React from "react";
import PropTypes from 'prop-types';

function Property(props) {
    return (
        <React.Fragment>
            <h2>{props.name}</h2>
            <button>Update</button> <button>Delete</button>
        </React.Fragment>
    );
}

Property.propTypes = {
    name: PropTypes.string
}

export default Property;