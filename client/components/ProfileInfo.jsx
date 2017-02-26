import React from 'react';
import { renderOptions } from '../helpers/userHelpers';
import { update, updateAddress } from '../actions/userActions';

const ProfileInfo = ({ userinfo, dispatch, error }) => {
  let firstName;
  let lastName;
  let email;
  let phone;
  let address;
  let city;
  let state;
  let zip;
  let country;

  const submitHandler = (e) => {
    e.preventDefault();
    if ((!!city.value || !!state.value || !!zip.value || !!country.value) && !address.value) {
      dispatch({ type: 'ADDRESS_REQUIRED', payload: 'address field is required' });
      return;
    }
    dispatch({ type: 'RESET_ERRORS' });
    const user = {
      firstName: firstName.value === '' ? userinfo.firstName : firstName.value,
      lastName: lastName.value === '' ? userinfo.lastName : lastName.value,
      email: email.value === '' ? userinfo.email : email.value,
      phone: phone.value === '' ? userinfo.phone : phone.value,
    };
    const addressInfo = {
      address: address.value === '' ? userinfo.address : address.value,
      city: city.value === '' ? userinfo.city : city.value,
      state: state.value === '' ? userinfo.state : state.value,
      zip: zip.value === '' ? userinfo.zip : zip.value,
      country: country.value === '' ? userinfo.country : country.value,
      user_id: userinfo.id,
    };
    dispatch(update(user))
    .then(() => dispatch(updateAddress(addressInfo)));
  };

  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <h2>Profile information</h2>
        <h3>Name</h3>
        <label htmlFor="firstName">First:</label>
        <input
          type="text"
          maxLength="35"
          id="firstName"
          placeholder={userinfo.firstName}
          ref={(ref) => { firstName = ref; }}
        />
        <br />
        <label htmlFor="lastName">Last:</label>
        <input
          type="text"
          maxLength="35"
          id="lastName"
          placeholder={userinfo.lastName}
          ref={(ref) => { lastName = ref; }}
        />
        <hr />
        <h3>Email</h3>
        <input
          type="email"
          maxLength="50"
          id="email"
          placeholder={userinfo.email}
          ref={(ref) => { email = ref; }}
        />
        <hr />
        <h3>Phone</h3>
        <input
          type="tel"
          maxLength="50"
          id="phone"
          placeholder={userinfo.phone || '(012) 345-6789'}
          ref={(ref) => { phone = ref; }}
        />
        <hr />
        <h3>Address</h3>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          maxLength="50"
          id="address"
          placeholder={userinfo.address || '7 maple street'}
          ref={(ref) => { address = ref; }}
        />
        <span>{error}</span>
        <br />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          maxLength="35"
          id="city"
          placeholder={userinfo.city || 'Lodi'}
          ref={(ref) => { city = ref; }}
        />
        <label htmlFor="state">State:</label>
        <select name="" id="state" ref={(ref) => { state = ref; }}>
          <option value="" selected="selected">{'' || userinfo.state}</option>
          {renderOptions()}
        </select>
        <br />
        <label htmlFor="zip">ZIP:</label>
        <input
          type="text"
          maxLength="10"
          id="zip"
          placeholder={userinfo.zip || '00000'}
          ref={(ref) => { zip = ref; }}
        />
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          maxLength="35"
          id="country"
          placeholder={userinfo.country || 'USA'}
          ref={(ref) => { country = ref; }}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default ProfileInfo;
