import React from "react";
import PropTypes from 'prop-types';

function PropertyDetail(props) {
    const {property} = props;

    return (
        <React.Fragment>
        <h2>{property.name}</h2>
            <button onClick={props.onPropEdit}>Update</button> <button onClick={() => props.onPropDelete(property.id)}>Delete</button>
            <hr/>
        </React.Fragment>
    );
}

PropertyDetail.propTypes = {
    property: PropTypes.object,
    onPropDelete: PropTypes.func,
    onPropEdit: PropTypes.func
}

export default PropertyDetail;