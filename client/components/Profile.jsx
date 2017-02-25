import React from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavBar.jsx';
import Institutions from './Institutions.jsx';
import ProfileInfo from './ProfileInfo.jsx';
import css from '../styles/profile.css';

const Profile = ({ accounts, userInfo, dispatch }) => (
  <div className="quicksand">
    <NavigationBar landing={false} />
    <div className="accounts-container">
      <Institutions accounts={accounts} />
    </div>
    <div className="main-profile-container">
      <ProfileInfo userinfo={userInfo} dispatch={dispatch} />
    </div>
  </div>
);

export default connect(state => ({
  accounts: state.accounts.accountData,
  userInfo: state.user,
}))(Profile);
