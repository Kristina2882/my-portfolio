import React from "react";
import PropTypes from 'prop-types';

function Property(props) {
    return (
        <React.Fragment>
            <div onClick={() => props.whenPropertyClicked(props.id)}>
            <h2>{props.name}</h2>
            <h4>{props.text}</h4>
            <hr/>
            </div>
        </React.Fragment>
    );
}

Property.propTypes = {
    name: PropTypes.string,
    whenPropertyClicked: PropTypes.func,
    text: PropTypes.string
}

export default Property;