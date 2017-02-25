import React from 'react';
import { renderOptions } from '../helpers/userHelpers';

// turn each section into a form
// make a submission button too
// when the submission button is clicked
  // take the name, phone and address fields, fit them into an update user action
  // take the address fields, fit them into a update address action which operates a find or create, and subsequently takes the new addresse's ID and applies it to the address foreign key attribute of that user object

const ProfileInfo = ({ userinfo, dispatch }) => (
  <div>
    <form action="">
      <h2>Profile information</h2>
      <h3>Name</h3>
      <label htmlFor="firstName">First:</label>
      <input type="text" maxLength="35" placeholder={userinfo.firstName} id="firstName" /><br />
      <label htmlFor="lastName">Last:</label>
      <input type="text" maxLength="35" placeholder={userinfo.lastName} id="lastName" />
      <hr />
      <h3>Email</h3>
      <input type="email" maxLength="50" placeholder={userinfo.email} id="email" />
      <hr />
      <h3>Phone</h3>
      <input type="tel" maxLength="50" placeholder={userinfo.phone || '(012) 345-6789'} id="phone" />
      <hr />
      <h3>Address</h3>
      <label htmlFor="address">Address:</label>
      <input type="text" maxLength="50" placeholder={userinfo.address || '7 maple street'} id="address" />
      <br />
      <label htmlFor="city">City:</label><input type="text" maxLength="35" placeholder={userinfo.city || 'Lodi'} id="city" />
      <label htmlFor="state">State:</label><select name="" id="state">{renderOptions()}</select>
      <br />
      <label htmlFor="zip">ZIP:</label><input type="text" maxLength="10" placeholder={userinfo.zip || '00000'} id="zip" />
      <label htmlFor="country">Country:</label><input type="text" maxLength="10" placeholder={userinfo.country || 'USA'} id="country" />
      <br />
      <input type="submit" />
    </form>
  </div>
);

export default ProfileInfo;
