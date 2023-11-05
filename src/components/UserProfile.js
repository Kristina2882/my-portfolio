import React from "react";
import PropTypes from 'prop-types';
import User from "./User";

function UserProfile(props) {

    const profileForUser = props.userList.filter(user => user.username === props.userName);

    return (
        <React.Fragment>
        <h2>User profile</h2>
        {profileForUser.map((user) => 
        <React.Fragment>
            <User
            propArray={props.propArray}
            username={user.username}
            property1={user.property1}
            property2={user.property2}
            property3={user.property3}
        />
        </React.Fragment>
        )}
        </React.Fragment>
    );
}

UserProfile.propTypes = {
    userList: PropTypes.array,
    userName: PropTypes.string,
    propArray: PropTypes.array

}
export default UserProfile;