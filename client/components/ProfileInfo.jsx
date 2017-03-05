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
    if ((!firstName.value || firstName.value === userinfo.firstName) &&
      (!lastName.value || lastName.value === userinfo.lastName) &&
      (!email.value || email.value === userinfo.email) &&
      (!phone.value || phone.value === userinfo.phone) &&
      (!address.value || address.value === userinfo.address) &&
      (!city.value || city.value === userinfo.city) &&
      (!state.value || state.value === userinfo.state) &&
      (!zip.value || zip.value === userinfo.zip) &&
      (!country.value || country.value === country.lastName)) return;
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
      id: userinfo.id,
    };
    const addressInfo = {
      address: address.value === '' ? userinfo.address : address.value,
      city: city.value === '' ? userinfo.city : city.value,
      state: state.value === '' ? userinfo.state : state.value,
      zip: zip.value === '' ? userinfo.zip : zip.value,
      country: country.value === '' ? userinfo.country : country.value,
      id: userinfo.id,
    };
    dispatch(update(user))
    .then(() => dispatch(updateAddress(addressInfo)));
  };

  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <h2>Profile information</h2>
        <h3>Name</h3>
        <div className="form-group" >
          <label htmlFor="firstName">First:</label>
          <input
            className="form-control profileinput"
            type="text"
            maxLength="35"
            id="firstName"
            placeholder={userinfo.firstName}
            ref={(ref) => { firstName = ref; }}
          />
        </div>
        <div className="form-group" >
          <label htmlFor="lastName">Last:</label>
          <input
            className="form-control profileinput"
            type="text"
            maxLength="35"
            id="lastName"
            placeholder={userinfo.lastName}
            ref={(ref) => { lastName = ref; }}
          />
        </div>
        <h3>Email</h3>
        <div className="form-group" >
          <input
            className="form-control profileinput"
            type="email"
            maxLength="50"
            id="email"
            placeholder={userinfo.email}
            ref={(ref) => { email = ref; }}
          />
          <span>{error.email}</span>
        </div>
        <h3>Phone</h3>
        <div className="form-group" >
          <input
            className="form-control profileinput"
            type="tel"
            maxLength="50"
            id="phone"
            placeholder={userinfo.phone || ''}
            ref={(ref) => { phone = ref; }}
          />
        </div>
        <h3>Address</h3>
        <div className="form-group" >
          <label htmlFor="address">Address:</label>
          <input
            className="form-control profileinput"
            type="text"
            maxLength="50"
            id="address"
            placeholder={userinfo.address === 'undefined' ? '' : userinfo.address}
            ref={(ref) => { address = ref; }}
          />
          <span>{error.address}</span>
          <br />
          <label htmlFor="city">City:</label>
          <input
            className="form-control profileinput"
            type="text"
            maxLength="35"
            id="city"
            placeholder={userinfo.city || ''}
            ref={(ref) => { city = ref; }}
          />
          <label htmlFor="state">State:</label>
          <select className="form-control profileinput" name="" id="state" ref={(ref) => { state = ref; }}>
            <option value="" selected="selected">{'' || userinfo.state}</option>
            {renderOptions()}
          </select>
          <br />
          <label htmlFor="zip">ZIP:</label>
          <input
            className="form-control profileinput"
            type="text"
            maxLength="10"
            id="zip"
            placeholder={userinfo.zip || ''}
            ref={(ref) => { zip = ref; }}
          />
          <label htmlFor="country">Country:</label>
          <input
            className="form-control profileinput"
            type="text"
            maxLength="35"
            id="country"
            placeholder={userinfo.country || ''}
            ref={(ref) => { country = ref; }}
          />
        </div>
        <input type="submit" style={{ marginRight: '10px' }} />
        <span>{error.profileUpdated}</span>
      </form>
    </div>
  );
};

export default ProfileInfo;
