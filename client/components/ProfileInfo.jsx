import React from 'react';

const ProfileInfo = ({ userinfo }) => (
  <div>
    <h2>Profile information</h2>
    <h3>Name</h3>
    <p>{userinfo.firstName} {userinfo.lastName}</p>
    <hr />
    <h3>Email</h3>
    <p>{userinfo.email}</p>
    <hr />
    <h3>Phone</h3>
    <p>{userinfo.phone || 'please give us your phone number :)'}</p>
    <hr />
    <h3>Address</h3>
    <div><span>Address: </span><span>{userinfo.address}</span></div>
    <div><span>City: </span><span>{userinfo.city}, </span><span>State: </span><span>{userinfo.state}</span></div>
    <div><span>ZIP: </span><span>{userinfo.zip}, </span><span>Country: </span><span>{userinfo.country}</span></div>
  </div>
);

export default ProfileInfo;
