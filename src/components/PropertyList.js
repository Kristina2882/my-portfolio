import React from "react";
import PropTypes from 'prop-types';
import Property from "./Property";

function PropertyList(props) {
    return (
        <React.Fragment>
            {props.mainPropList.map((property) => 
                <Property 
                whenPropertyClicked={props.onPropertySelection}
                name={property.name}
                id = {property.id}
                key= {property.id}
                />
            )}

        </React.Fragment>
    );
}

PropertyList.propTypes = {
    mainPropList: PropTypes.array,
    onPropertySelection: PropTypes.func
}

export default PropertyList;