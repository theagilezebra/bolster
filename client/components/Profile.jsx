import React from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavBar.jsx';
import Institutions from './Institutions.jsx';
import ProfileInfo from './ProfileInfo.jsx';
import DeleteAccount from './DeleteAccount.jsx';
import css from '../styles/profile.css';

const Profile = ({ accounts, userInfo, dispatch, error }) => (
  <div className="quicksand">
    <NavigationBar />
    <div className="container profilepadding">
      <div className="row">
        <div className="col-md-6">
          <ProfileInfo userinfo={userInfo} dispatch={dispatch} error={error} />
          <DeleteAccount userinfo={userInfo} dispatch={dispatch} error={error} />
        </div>
        <div className="col-md-4">
          <Institutions accounts={accounts} dispatch={dispatch} />
        </div>
      </div>
    </div>
  </div>
);

export default connect(state => ({
  accounts: state.accounts.accountData,
  userInfo: state.user,
  error: state.error,
}))(Profile);
