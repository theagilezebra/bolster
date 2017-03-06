import React from 'react';
import { deleteAccount } from '../actions/userActions';

const DeleteAccount = ({ userinfo, dispatch, error }) => {
  let password = null;
  const deletionHandler = (e) => {
    e.preventDefault();
    dispatch({ type: 'RESET_ERRORS' });
    dispatch(deleteAccount({ id: userinfo.id, password: password.value, email: userinfo.email }));
  };

  return (
    <div>
      <h3>Danger Zone: Account Deletion</h3>
      <form action="">
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input className="form-control profileinput" type="password" id="password" ref={(ref) => { password = ref; }} />
          <br />
          <label htmlFor="delete-button">Careful: deleting your account is irreversible!</label>
          <input type="submit" id="delete-button" onClick={deletionHandler} style={{ marginLeft: '10px' }} />
          <div className="error-message">{error.deleteUser}</div>
        </div>
      </form>
    </div>
  );
};

export default DeleteAccount;
