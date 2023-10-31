import React from "react";
import PropTypes from 'prop-types';
import Property from "./Property";

function PropertyList(props) {
    return (
        <React.Fragment>
            {props.mainPropList.map((property, index) => {
                <Property 
                name={property.name}
                id = {index}
                />
            })}

        </React.Fragment>
    );
}

PropertyList.propTypes = {
    mainPropList: PropTypes.array
}