import React from "react";
import PropTypes from 'prop-types';
import {auth} from '../firebase';

function UserProfile(props) {

    const propsArray = props.listForUsers.map(function(property) {
    return property.name;
    }
    );

    console.log(propsArray);


    return (
        <React.Fragment>  
        <h2><strong>{props.userProfile}</strong></h2>
        <h2>{propsArray[0]}: {props.property1}</h2>
        <h2>{propsArray[1]}: {props.property2}</h2>
        <h2>{propsArray[2]}: {props.property3}</h2>
         <button onClick={props.onClickEdit}>Edit</button>
         
        </React.Fragment>
    );
}

UserProfile.propTypes = {
    listForUsers: PropTypes.array,
    userProfile: PropTypes.string,
    property1: PropTypes.string,
    property2: PropTypes.string,
    property3: PropTypes.string,
    onClickEdit: PropTypes.func
}
export default UserProfile;