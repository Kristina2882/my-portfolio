import React from "react";
import PropTypes from 'prop-types';

function User(props) {
    return (
    <React.Fragment>
        <h3>{props.username}</h3>
        <h4>{props.propArray[0].name} - {props.property1}</h4>
        <h4>{props.propArray[1].name} - {props.property2}</h4>
        <h4>{props.propArray[2].name} - {props.property3}</h4>
    </React.Fragment>
    );
}

User.propTypes = {
    username: PropTypes.string,
    property1: PropTypes.string,
    property2: PropTypes.string,
    property3: PropTypes.string,
    propArray: PropTypes.array
}

export default User;