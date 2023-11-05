import React from "react";
import PropTypes from 'prop-types';
import User from "./User";

function UserProfile(props) {

    const profileForUser = props.userList.filter(user => user.username === props.userName)[0];

    return (
        <React.Fragment>
        <h2>User profile</h2>
            <User
            propArray={props.propArray}
            username={profileForUser.username}
            property1={profileForUser.property1}
            property2={profileForUser.property2}
            property3={profileForUser.property3}
        />
        <button onClick={props.onEditUserClick}>Edit profile</button>
        </React.Fragment>
    );
}

UserProfile.propTypes = {
    userList: PropTypes.array,
    userName: PropTypes.string,
    propArray: PropTypes.array,
    onEditUserClick: PropTypes.func

}
export default UserProfile;