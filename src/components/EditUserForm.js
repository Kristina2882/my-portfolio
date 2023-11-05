import React from "react";
import PropTypes from 'prop-types';

function EditUserForm(props) {

    const profileForUser = props.userList.filter(user => user.username === props.userName)[0];
    
    function handleEditUserSubmission(event) {
        event.preventDefault();
        props.onEditUser({
           username: profileForUser.username,
           property1: event.target.property1.value,
           property2: event.target.property2.value,
           property3: event.target.property3.value,
           id: profileForUser.id
        });

    }

    return (
        <React.Fragment>
              <form onSubmit={handleEditUserSubmission}>

                <label>{props.propList[0].name}</label> 
                <input
                type="property1"
                name="property1"
                />
                <br/> <br/>
                <label>{props.propList[1].name}</label> 
                 <input
                type="property2"
                name="property2"
                />
                <br/> <br/>
                <label>{props.propList[2].name}</label> 
                 <input
                type="property3"
                name="property3"
                />
                <br/><br/>
                <button type="submit">Update profile!</button>
            </form>
        
        </React.Fragment>
    );
}

EditUserForm.propTypes = {
    onEditUser: PropTypes.func,
    propList: PropTypes.array,
    userList: PropTypes.array,
    userName: PropTypes.string
}

export default EditUserForm;